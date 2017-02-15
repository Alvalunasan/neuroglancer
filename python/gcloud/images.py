#!/usr/bin/python

import argparse
import json
import numpy as np
import h5py
import os
from itertools import product
from neuroglancer import chunks
from neuroglancer import downsample_scales
from google.cloud import storage
from tqdm import tqdm
import subprocess
import shutil
import random

STAGING_DIR = os.environ['HOME'] + '/neuroglancer/python/gcloud/staging/'
FILES_PER_SUBDIR = 300

def mkdir(path):
    if not os.path.exists(path):
        os.makedirs(path)

    return path

def generateInfo(layer_type, data_type, resolution, volume_size, chunk_size=64, num_channels=1):
  info = {
    "data_type": data_type,
    "num_channels": num_channels,
    "scales": [], 
    "type": layer_type,
  }

  if layer_type == "image":
    encoding = "jpeg"
  elif layer_type == "segmentation":
    info['mesh'] = "mesh"
    encoding = "raw"

  scale_ratio = downsample_scales.compute_near_isotropic_downsampling_scales(
    size=volume_size,
    voxel_size=resolution,
    dimensions_to_downsample=[0, 1, 2],
    max_downsampling=float('inf')
  )

  for ratio in scale_ratio:
    downsampled_resolution = map(int, (np.array(resolution) * np.array(ratio)))
    scale = {  
      "chunk_sizes": [ [chunk_size, chunk_size, chunk_size] ],
      "encoding": encoding, 
      "key": "_".join(map(str, downsampled_resolution)),
      "resolution": downsampled_resolution,
      "size": map(int, np.ceil(np.array(volume_size) / ratio)),
      "voxel_offset": [0, 0, 0],
    }

    info["scales"].append(scale)

  return info

def generateDownsamples(img, resolution, scale, chunk_size):
  volume_size = scale['size']
  downsample_ratio = np.array(scale["resolution"]) / np.array(resolution)
  x_stride, y_stride, z_stride = map(int, downsample_ratio)

  n_chunks = np.array(volume_size) / np.array(chunk_size).astype(np.float32)
  n_chunks = np.ceil(n_chunks).astype(np.uint32)
  (x_chunk_size, y_chunk_size, z_chunk_size) = chunk_size

  every_xyz = product(*list(map(xrange, n_chunks)))

  for x,y,z in every_xyz:
    subimg = img[
      (z * z_chunk_size * z_stride) : ( (z+1) * z_chunk_size * z_stride) : z_stride,
      (y * y_chunk_size * y_stride) : ( (y+1) * y_chunk_size * y_stride) : y_stride,
      (x * x_chunk_size * x_stride) : ( (x+1) * x_chunk_size * x_stride) : x_stride
    ]

    filename = '{}-{}_{}-{}_{}-{}'.format(
      x * x_chunk_size, min((x + 1) * x_chunk_size, scale['size'][0]),
      y * y_chunk_size, min((y + 1) * y_chunk_size, scale['size'][1]),
      z * z_chunk_size, min((z + 1) * z_chunk_size, scale['size'][2])
    ) 

    yield subimg, filename

def generateStagingMaterials(img, resolution, info, dataset, layer_name):
  for scale in info["scales"][::-1]:

    staging_dir = os.path.join(STAGING_DIR, layer_name, scale['key'])
    
    if os.path.exists(staging_dir):
      shutil.rmtree(staging_dir)
    
    mkdir(staging_dir)

    for chunk_size in scale["chunk_sizes"]:
      dirname = '{}/{}/{}/'.format(dataset, layer_name, scale["key"])

      count = 0
      current_dir_index = 0

      subdir = mkdir(os.path.join(staging_dir, current_dir_index))

      for img_chunk, filename in tqdm(generateDownsamples(img, resolution, scale, chunk_size)):
        if count % FILES_PER_SUBDIR == 0:
          if count > 0:
            yield staging_dir, scale['key']
            subdir = mkdir(os.path.join(staging_dir, current_dir_index))
            current_dir_index += 1

        content_type = 'application/octet-stream'
        content_encoding = None

        if scale["encoding"] == "jpeg":
          content_type = 'image/jpeg'
          encoded = chunks.encode_jpeg(img_chunk)
        elif scale["encoding"] == "npz":
          encoded = chunks.encode_npz(img_chunk)
        elif scale["encoding"] == "raw":
          content_encoding = 'gzip'
          encoded = chunks.encode_raw(img_chunk)
        else:
          raise NotImplemented

        with open(os.path.join(subdir, filename), 'wb+') as f:
          f.write(encoded)

        count += 1

    yield staging_dir, scale['key']

def upload_to_gcloud(directory, layer_name, key, compress, dataset, bucket_name, cache_control=None, content_type=None):
  def mkheader(header, content):
    if content is not None:
      return "-h '{}:{}'".format(header, content)
    return None

  headers = [
    mkheader('Content-Type', content_type),
    mkheader('Cache-Control', cache_control)
  ]

  headers = [ x for x in headers if x is not None ]

  print("Uploading " + directory)

  dirs = os.listdir(directory)
  for dir_index in dirs:
    subdir = os.path.join(directory, dir_index)
    gsutil_upload_command = "gsutil {headers} -m cp {compress} -a public-read {local_dir} gs://{bucket}/{dataset}/{layer}/{key}/".format(
      headers=" ".join(headers),
      compress=('-Z' if compress else ''),
      local_dir=os.path.join(subdir, '*'),
      bucket=bucket_name,
      dataset=dataset,
      layer=layer_name,
      key=key
    )
    print(gsutil_upload_command)
    subprocess.check_call(gsutil_upload_command, shell=True)
    shutil.rmtree(subdir)

  shutil.rmtree(directory)

def process_hdf5(filename, dataset, bucket_name, resolution, layer):
  content_types = {
    'image': 'image/jpeg',
    'segmentation': 'application/octet-stream',
  }

  print("Processing " + layer)
  with h5py.File(filename, 'r') as f:
    img = f['main']

    volume_size = img.shape[::-1] 
    data_type = str(img.dtype)

    info = generateInfo(
      layer_type= layer,
      data_type=data_type,
      resolution=resolution,
      volume_size=volume_size
    )

    client = storage.Client(project='neuromancer-seung-import')
    bucket = client.get_bucket(bucket_name)

    print("Uploading Info")
    blob = storage.blob.Blob('{}/{}/info'.format(dataset, layer), bucket)
    blob.upload_from_string(json.dumps(info))
    blob.make_public()

    print("Generating staging files...")
    for staging_dir, key in generateStagingMaterials(img, resolution, info, dataset, layer):
      upload_to_gcloud(
        directory=staging_dir,
        dataset=dataset,
        bucket_name=bucket_name,
        layer_name=layer,
        key=key,
        content_type=content_types[layer],
        compress=(layer == 'segmentation'),
      )

if __name__ == '__main__':
  parser = argparse.ArgumentParser(description='Upload hdf5s to GCloud in a Neuroglancer readable format.')
  parser.add_argument('--channel', dest='channel_path', action='store',
                    default=None, metavar='IMAGE_FILE_PATH',
                    help='Filepath to channel image stack hdf5')

  parser.add_argument('--segmentation', dest='segmentation_path', action='store',
                    default=None, metavar='IMAGE_FILE_PATH',
                    help='Filepath to segmentation hdf5')

  parser.add_argument('--dataset', dest='dataset_name', action='store',
                                  metavar='DATASET_NAME',
                    help='Name of dataset to store in gcloud', required=True)

  parser.add_argument('--bucket', dest='bucket_name', action='store',
                                  metavar='BUCKET_NAME',
                    help='Name of gcloud bucket to use', required=True)  

  parser.add_argument('--resolution', dest='resolution', action='store',
                                metavar='X,Y,Z',
                  help='X,Y,Z comma seperated anisotropy. e.g. 6,6,30 meaning 6nm x 6nm x 30nm', required=True)  


  args = parser.parse_args()

  resolution = map(int, args.resolution.split(','))

  if args.channel_path is not None:
    process_hdf5(
      filename=args.channel_path,
      dataset=args.dataset_name,
      bucket_name=args.bucket_name,
      resolution=resolution,
      layer='image'
    )

  if args.segmentation_path is not None:
    process_hdf5(
      filename=args.segmentation_path,
      dataset=args.dataset_name,
      bucket_name=args.bucket_name,
      resolution=resolution,
      layer='segmentation'
    )

# time python upload.py --dataset snemi3d --bucket neuroglancer-dev --channel ./snemi3d/image.h5 --segmentation ./snemi3d/machine_labels.h5 --resolution 6,6,30

# https://neuroglancer-demo.appspot.com/#!{'layers':{'raw_image':{'type':'image'_'source':'precomputed://gs://neuroglancer/snemi3d/raw_image'}}_'navigation':{'pose':{'position':{'voxelSize':[6_6_30]_'voxelCoordinates':[512_512_64]}}_'zoomFactor':6}}




