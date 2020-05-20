/**
 * @license
 * Copyright 2016 Google Inc.
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

import {UserLayer} from 'neuroglancer/layer';
import {LayerListSpecification, registerLayerType, registerVolumeLayerType} from 'neuroglancer/layer_specification';
import {Overlay} from 'neuroglancer/overlay';
import {VolumeType} from 'neuroglancer/sliceview/volume/base';
import {DEFAULT_IMAGE_CONTRAST,FRAGMENT_MAIN_START, getTrackableFragmentMain, ImageRenderLayer} from 'neuroglancer/sliceview/volume/image_renderlayer';
import {trackableAlphaValue} from 'neuroglancer/trackable_alpha';
import {trackableFiniteFloat} from 'neuroglancer/trackable_finite_float';
import {TrackableBoolean} from 'neuroglancer/trackable_boolean';
import {trackableBlendModeValue} from 'neuroglancer/trackable_blend';
import {UserLayerWithVolumeSourceMixin} from 'neuroglancer/user_layer_with_volume_source';
import {makeWatchableShaderError} from 'neuroglancer/webgl/dynamic_shader';
import {ShaderControlState} from 'neuroglancer/webgl/shader_ui_controls';
import {EnumSelectWidget} from 'neuroglancer/widget/enum_widget';
import {MinimizableGroupWidget} from 'neuroglancer/widget/minimizable_group';
import {RangeWidget} from 'neuroglancer/widget/range';
import {RenderScaleWidget} from 'neuroglancer/widget/render_scale_widget';
import {ShaderCodeWidget} from 'neuroglancer/widget/shader_code_widget';
import {ShaderControls} from 'neuroglancer/widget/shader_controls';
import {Tab} from 'neuroglancer/widget/tab_view';

import './image_user_layer.css';
import 'neuroglancer/maximize_button.css';

const OPACITY_JSON_KEY = 'opacity';
const BLEND_JSON_KEY = 'blend';
const SHADER_JSON_KEY = 'shader';
const SHADER_CONTROLS_JSON_KEY = 'shaderControls';

const Base = UserLayerWithVolumeSourceMixin(UserLayer);
export class ImageUserLayer extends Base {
  colorContrast = trackableFiniteFloat(DEFAULT_IMAGE_CONTRAST)
  colorInverted = new TrackableBoolean(false)
  opacity = trackableAlphaValue(0.5);
  blendMode = trackableBlendModeValue();
  fragmentMain = getTrackableFragmentMain();
  shaderError = makeWatchableShaderError();
  renderLayer: ImageRenderLayer;
  shaderControlState = new ShaderControlState(this.fragmentMain);
  constructor(manager: LayerListSpecification, x: any) {
    super(manager, x);
    this.registerDisposer(this.blendMode.changed.add(this.specificationChanged.dispatch));
    this.registerDisposer(this.fragmentMain.changed.add(this.specificationChanged.dispatch));
    this.registerDisposer(this.shaderControlState.changed.add(this.specificationChanged.dispatch));  
    this.tabs.add(
        'rendering',
        {label: 'Rendering', order: -100, getter: () => new RenderingOptionsTab(this)});
    this.tabs.default = 'rendering';
  }

  restoreState(specification: any) {
    super.restoreState(specification);
    this.opacity.restoreState(specification[OPACITY_JSON_KEY]);
    const blendValue = specification[BLEND_JSON_KEY];
    if (blendValue !== undefined) {
      this.blendMode.restoreState(blendValue);
    }
    this.fragmentMain.restoreState(specification[SHADER_JSON_KEY]);
    this.shaderControlState.restoreState(specification[SHADER_CONTROLS_JSON_KEY]);
    const {multiscaleSource} = this;
    if (multiscaleSource === undefined) {
      throw new Error(`source property must be specified`);
    }
    multiscaleSource.then(volume => {
      if (!this.wasDisposed) {
        let renderLayer = this.renderLayer = new ImageRenderLayer(volume, {
          opacity: this.opacity,
          blendMode: this.blendMode,
          shaderControlState: this.shaderControlState,
          shaderError: this.shaderError,
          transform: this.transform,
          renderScaleTarget: this.sliceViewRenderScaleTarget,
          renderScaleHistogram: this.sliceViewRenderScaleHistogram,
        });
        this.addRenderLayer(renderLayer);
        this.shaderError.changed.dispatch();
        this.isReady = true;
      }
    });
  }
  toJSON() {
    const x = super.toJSON();
    x['type'] = 'image';
    x[OPACITY_JSON_KEY] = this.opacity.toJSON();
    x[BLEND_JSON_KEY] = this.blendMode.toJSON();
    x[SHADER_JSON_KEY] = this.fragmentMain.toJSON();
    x[SHADER_CONTROLS_JSON_KEY] = this.shaderControlState.toJSON();
    return x;
  }

  handleAction(action: string) {

    switch (action) {

      case 'invert-colormap': {
        if (this.colorInverted.value) {
          console.log("Colormap is already inverted");
          console.log("...reverting");
          // keep current contrast level and revert to toNormalized()
          const fragmentStr = "void main() {emitGrayscale(toNormalized(getDataValue())*"+this.colorContrast.value.toFixed(1)+");}";  
          this.fragmentMain.value = fragmentStr;
          // now set the colorInverted property to false to reflect updated state
          this.colorInverted.value = false;
        }
        else {
          console.log("Colormap is not inverted");
          console.log("...inverting");
          // keep current contrast level, but invert via 1.0-toNormalized() 
          const fragmentStr = "void main() {emitGrayscale(1.0-toNormalized(getDataValue())*"+this.colorContrast.value.toFixed(1)+");}";  
          this.fragmentMain.value = fragmentStr;
          // now set the colorInverted property to true to reflect updated state 
          this.colorInverted.value = true;
        }
        break;
      }

      case 'increase-contrast': {
        this.colorContrast.value += 5.0;
        // Figure out if inverted or not
        var fragmentStr = "void main() {emitGrayscale"
        if (this.colorInverted.value) {
          fragmentStr += "(1.0-toNormalized(getDataValue())*"+this.colorContrast.value.toFixed(1)+");}";
        }
        else {
          fragmentStr += "(toNormalized(getDataValue())*"+this.colorContrast.value.toFixed(1)+");}";
        }
        this.fragmentMain.value = fragmentStr;
        break;
      }

      case 'decrease-contrast': {
        this.colorContrast.value -= 5.0;
        var fragmentStr = "void main() {emitGrayscale"
        // Figure out if inverted or not
        if (this.colorInverted.value) {
          fragmentStr += "(1.0-toNormalized(getDataValue())*"+this.colorContrast.value.toFixed(1)+");}";
        }
        else {
          fragmentStr += "(toNormalized(getDataValue())*"+this.colorContrast.value.toFixed(1)+");}";
        }
        this.fragmentMain.value = fragmentStr;
        break;
      }
    }
  }

}

function makeShaderCodeWidget(layer: ImageUserLayer) {
  return new ShaderCodeWidget({
    shaderError: layer.shaderError,
    fragmentMain: layer.fragmentMain,
    fragmentMainStartLine: FRAGMENT_MAIN_START,
    shaderControlState: layer.shaderControlState,
  });
}

class RenderingOptionsTab extends Tab {
  private group2D = this.registerDisposer(new MinimizableGroupWidget('2D Visualization'));
  opacityWidget = this.registerDisposer(new RangeWidget(this.layer.opacity));
  codeWidget = this.registerDisposer(makeShaderCodeWidget(this.layer));
  constructor(public layer: ImageUserLayer) {
    super();
    const {group2D, element} = this;
    element.classList.add('image-dropdown');
    let {opacityWidget} = this;
    let topRow = document.createElement('div');
    topRow.className = 'image-dropdown-top-row';
    opacityWidget.promptElement.textContent = 'Opacity';

    {
      const renderScaleWidget = this.registerDisposer(new RenderScaleWidget(
          this.layer.sliceViewRenderScaleHistogram, this.layer.sliceViewRenderScaleTarget));
      renderScaleWidget.label.textContent = 'Resolution (slice)';
      group2D.appendFixedChild(renderScaleWidget.element);
    }

    {
      const label = document.createElement('label');
      label.textContent = 'Blending';
      label.appendChild(this.registerDisposer(new EnumSelectWidget(layer.blendMode)).element);
      element.appendChild(label);
    }

    let spacer = document.createElement('div');
    spacer.style.flex = '1';
    let helpLink = document.createElement('a');
    let helpButton = document.createElement('button');
    helpButton.type = 'button';
    helpButton.textContent = '?';
    helpButton.className = 'help-link';
    helpLink.appendChild(helpButton);
    helpLink.title = 'Documentation on image layer rendering';
    helpLink.target = '_blank';
    helpLink.href =
        'https://github.com/google/neuroglancer/blob/master/src/neuroglancer/sliceview/image_layer_rendering.md';

    let maximizeButton = document.createElement('button');
    maximizeButton.innerHTML = '&square;';
    maximizeButton.className = 'maximize-button';
    maximizeButton.title = 'Show larger editor view';
    this.registerEventListener(maximizeButton, 'click', () => {
      new ShaderCodeOverlay(this.layer);
    });

    topRow.appendChild(this.opacityWidget.element);
    topRow.appendChild(spacer);
    topRow.appendChild(maximizeButton);
    topRow.appendChild(helpLink);

    group2D.appendFixedChild(topRow);
    group2D.appendFlexibleChild(this.codeWidget.element);
    group2D.appendFlexibleChild(
      this.registerDisposer(new ShaderControls(layer.shaderControlState)).element);
    element.appendChild(group2D.element);
    this.codeWidget.textEditor.refresh();

    this.visibility.changed.add(() => {
      if (this.visible) {
        this.codeWidget.textEditor.refresh();
      }
    });
  }
}

class ShaderCodeOverlay extends Overlay {
  codeWidget = this.registerDisposer(makeShaderCodeWidget(this.layer));
  constructor(public layer: ImageUserLayer) {
    super();
    this.content.classList.add('image-layer-shader-overlay');
    this.content.appendChild(this.codeWidget.element);
    this.codeWidget.textEditor.refresh();
  }
}

registerLayerType('image', ImageUserLayer);
registerVolumeLayerType(VolumeType.IMAGE, ImageUserLayer);
