/**
 * @license
 * Copyright 2018 Google Inc.
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

/**
 * @file Facilities for drawing quads in WebGL as two triangles.
 */

import {RefCounted} from 'neuroglancer/util/disposable';
import {Buffer, getMemoizedBuffer} from 'neuroglancer/webgl/buffer';
import {GL_ELEMENT_ARRAY_BUFFER, GL_TRIANGLES, GL_UNSIGNED_SHORT, GL_TRIANGLE_FAN} from 'neuroglancer/webgl/constants';
import {GL} from 'neuroglancer/webgl/context';

export const VERTICES_PER_QUAD = 4;
export const TRIANGLES_PER_QUAD = 2;
export const INDICES_PER_QUAD = TRIANGLES_PER_QUAD * 3;

/**
 * Returns a GL_TRIANGLES index array for drawing an instance containing `quadsPerInstance` quads.
 */
function getQuadIndexArray(quadsPerInstance: number) {
  const result = new Uint16Array(quadsPerInstance * INDICES_PER_QUAD);
  for (let quad = 0; quad < quadsPerInstance; ++quad) {
    const v = quad * VERTICES_PER_QUAD;
    let i = quad * INDICES_PER_QUAD;
    result[i] = v;
    result[i + 1] = v + 1;
    result[i + 2] = v + 2;
    result[i + 3] = v + 2;
    result[i + 4] = v + 3;
    result[i + 5] = v;
  }
  return result;
}

export class QuadRenderHelper extends RefCounted {
  quadIndexBuffer: Buffer;
  constructor(gl: GL, public quadsPerInstance: number) {
    super();
    if (quadsPerInstance !== 1) {
      this.quadIndexBuffer = this.registerDisposer(getMemoizedBuffer(
                                                       gl, GL_ELEMENT_ARRAY_BUFFER,
                                                       getQuadIndexArray, quadsPerInstance))
                                 .value;
    }
  }

  draw(gl: GL, numInstances: number) {
    if (this.quadsPerInstance === 1) {
      gl.ANGLE_instanced_arrays.drawArraysInstancedANGLE(GL_TRIANGLE_FAN, 0, 4, numInstances);
    } else {
      this.quadIndexBuffer.bind();
      gl.ANGLE_instanced_arrays.drawElementsInstancedANGLE(
          GL_TRIANGLES, INDICES_PER_QUAD * this.quadsPerInstance, GL_UNSIGNED_SHORT, /*offset=*/0,
          numInstances);
    }
  }
}
