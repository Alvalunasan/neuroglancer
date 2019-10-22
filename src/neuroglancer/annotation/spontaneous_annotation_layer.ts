/**
 * @license
 * Copyright 2019 The Neuroglancer Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {vec3} from 'gl-matrix';

import {ChunkManager} from '../chunk_manager/frontend';
import {CoordinateTransform} from '../coordinate_transform';
import {TrackableAlphaValue, trackableAlphaValue} from '../trackable_alpha';
import {TrackableRGB} from '../util/color';
import {Owned, RefCounted} from '../util/disposable';

import {Annotation, AnnotationSource, LocalAnnotationSource} from '.';
import {AnnotationLayerState} from './annotation_layer_state';
import {MultiscaleAnnotationSource, SliceViewAnnotationLayer} from './frontend';
import {AnnotationLayer, PerspectiveViewAnnotationLayer} from './renderlayer';
import { RenderLayer } from '../layer';


/**
 * AnnotationLayer wrapper class that makes it easy to create AnnotationLayers on demand.
 */
export class SpontaneousAnnotationLayer extends RefCounted {
  source: LocalAnnotationSource;
  annotationLayer: AnnotationLayer;
  annotationLayerState: AnnotationLayerState;
  renderLayers: RenderLayer[];
  // sliceViewRenderLayer: AnnotationRenderLayer<typeof AnnotationSliceViewRenderLayerBase>.C&
  //     AnnotationSliceViewRenderLayerBase;
  // sliceViewRenderLayer =
  // sliceViewRenderLayer;

  constructor(
      chunkManager: ChunkManager,
      public transform: CoordinateTransform,
      public color = new TrackableRGB(vec3.fromValues(1.0, 1.0, 0.0)),
      public fillOpacity = trackableAlphaValue(1.0),
  ) {
    super();
    const source = this.source = this.registerDisposer(new LocalAnnotationSource());
    this.annotationLayerState = this.registerDisposer(new AnnotationLayerState({transform, source, color, fillOpacity}));
    this.annotationLayer = this.registerDisposer(new AnnotationLayer(chunkManager, this.annotationLayerState));
    const sliceViewRenderLayer = new SliceViewAnnotationLayer(this.annotationLayer);
    const perspectiveViewAnnotationLayer = new PerspectiveViewAnnotationLayer(this.annotationLayer.addRef());
    this.renderLayers = [sliceViewRenderLayer, perspectiveViewAnnotationLayer];
  }
}
