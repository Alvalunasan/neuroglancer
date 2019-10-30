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

import './contact_sites_widget.css';

import {mat4, vec3} from 'gl-matrix';

import {Point} from '../annotation';
import {setAnnotationHoverStateFromMouseState} from '../annotation/selection';
import {SpontaneousAnnotationLayer} from '../annotation/spontaneous_annotation_layer';
import {ContactSite, PairwiseContactSites} from '../graph/contact_sites';
import {SegmentationUserLayerWithGraph} from '../segmentation_user_layer_with_graph';
import {StatusMessage} from '../status';
import {TrackableBoolean, TrackableBooleanCheckbox} from '../trackable_boolean';
import {TrackableRGB} from '../util/color';
import {RefCounted} from '../util/disposable';
import {removeFromParent} from '../util/dom';
import {Uint64} from '../util/uint64';

import {ColorWidget} from './color';
import {MinimizableGroupWidget, MinimizableGroupWidgetWithHeader} from './minimizable_group';
import {Uint64EntryWidget} from './uint64_entry_widget';

export class PairwiseContactSitesWidget extends RefCounted {
  groupElement = this.registerDisposer(new MinimizableGroupWidget('Contact Sites (for pair)'));
  private contactSiteGroupIdCounter = 0;
  private segment1: Uint64|null = null;
  private segment2: Uint64|null = null;
  private segment1Label = document.createElement('label');
  private segment2Label = document.createElement('label');
  private removeSegment1Button = document.createElement('button');
  private removeSegment2Button = document.createElement('button');
  private contactSiteNameInput = document.createElement('input');

  constructor(
      private segmentationLayer: SegmentationUserLayerWithGraph,
      private createContactSitesUL:
          (pairwiseContactSiteGroup: PairwiseContactSites,
           minimizableGroupForContactSitesPair: MinimizableGroupWidgetWithHeader,
           annotationLayerForContactSitesPair: SpontaneousAnnotationLayer, firstSegment: Uint64,
           secondSegment: Uint64) => HTMLElement[]) {
    super();
    this.createSegmentInputElements();
    this.createGetContactSitesButton();
    // Create groups for existing contact site lists
    const pairwiseContactSiteLists = segmentationLayer.contactSites.pairwiseContactSiteLists;
    pairwiseContactSiteLists.forEach(contactSiteList => {
      const contactSiteGroup = this.createContactSiteGroupElement(contactSiteList, true);
      this.groupElement.appendFlexibleChild(contactSiteGroup);
    });
  }

  private deselectSegment1() {
    this.segment1 = null;
    this.segment1Label.textContent = 'Segment 1: Not selected';
    this.removeSegment1Button.style.display = 'none';
  }

  private deselectSegment2() {
    this.segment2 = null;
    this.segment2Label.textContent = 'Segment 2: Not selected';
    this.removeSegment2Button.style.display = 'none';
  }

  private createSegmentInputElements() {
    const {
      segment1Label,
      segment2Label,
      removeSegment1Button,
      removeSegment2Button,
      contactSiteNameInput
    } = this;
    const addSegmentLabel = document.createElement('span');
    addSegmentLabel.textContent = 'Enter segment IDs: ';
    const addSegmentInput = this.registerDisposer(new Uint64EntryWidget());
    addSegmentInput.element.style.display = 'inline-block';
    const addSegmentElement = document.createElement('div');
    addSegmentElement.appendChild(addSegmentLabel);
    addSegmentElement.appendChild(addSegmentInput.element);
    const segment1Display = document.createElement('div');
    segment1Label.className = 'neuroglancer-select-text';
    segment1Label.textContent = 'Segment 1: Not selected';
    removeSegment1Button.textContent = 'x';
    removeSegment1Button.addEventListener('click', () => {
      this.deselectSegment1();
    });
    removeSegment1Button.style.display = 'none';
    segment1Display.appendChild(segment1Label);
    segment1Display.appendChild(removeSegment1Button);
    const segment2Display = document.createElement('div');
    segment2Label.className = 'neuroglancer-select-text';
    segment2Label.textContent = 'Segment 2: Not selected';
    removeSegment2Button.textContent = 'x';
    removeSegment2Button.addEventListener('click', () => {
      this.deselectSegment2();
    });
    removeSegment2Button.style.display = 'none';
    segment2Display.appendChild(segment2Label);
    segment2Display.appendChild(removeSegment2Button);
    this.registerDisposer(addSegmentInput.valuesEntered.add((values) => {
      for (let i = 0; i < values.length; i++) {
        if (this.segment1 && this.segment2) {
          StatusMessage.showTemporaryMessage('Two segments already selected.', 3000);
          break;
        }
        if (this.segment1) {
          if (Uint64.equal(this.segment1, values[i])) {
            StatusMessage.showTemporaryMessage(`Segment ${values[i]} already selected`, 3000);
          } else {
            this.segment2 = values[i];
            segment2Label.textContent = `Segment 2: ${this.segment2.toString()}`;
            removeSegment2Button.style.display = '';
          }
        } else {
          if (this.segment2 && Uint64.equal(this.segment2, values[i])) {
            StatusMessage.showTemporaryMessage(`Segment ${values[i]} already selected`, 3000);
          } else {
            this.segment1 = values[i];
            segment1Label.textContent = `Segment 1: ${this.segment1.toString()}`;
            removeSegment1Button.style.display = '';
          }
        }
      }
    }));
    const contactSiteNameInputLabel = document.createElement('label');
    contactSiteNameInputLabel.textContent = 'Alias for contact sites: ';
    contactSiteNameInputLabel.appendChild(contactSiteNameInput);
    contactSiteNameInput.placeholder = 'Contact Sites for Pair #1';
    this.groupElement.appendFixedChild(addSegmentElement);
    this.groupElement.appendFixedChild(segment1Display);
    this.groupElement.appendFixedChild(segment2Display);
    this.groupElement.appendFixedChild(contactSiteNameInputLabel);
  }

  private createGetContactSitesButton() {
    const {contactSiteNameInput, segmentationLayer} = this;
    const getContactSitesButton = document.createElement('button');
    getContactSitesButton.textContent = 'Get contact sites';
    getContactSitesButton.addEventListener('click', () => {
      if (this.segment1 === null || this.segment2 === null) {
        StatusMessage.showTemporaryMessage('You must enter two segment IDs first.', 5000);
      } else {
        const firstSegmentClone = this.segment1.clone();
        const secondSegmentClone = this.segment2.clone();
        this.contactSiteGroupIdCounter++;
        const contactSitesForPairTitle = (contactSiteNameInput.value) ?
            contactSiteNameInput.value :
            `Contact Sites for Pair #${this.contactSiteGroupIdCounter}`;
        contactSiteNameInput.value = '';
        contactSiteNameInput.placeholder =
            `Contact Sites for Pair #${this.contactSiteGroupIdCounter + 1}`;
        this.deselectSegment1();
        this.deselectSegment2();
        segmentationLayer.chunkedGraphLayer!
            .getContactSitesForPair(
                firstSegmentClone, secondSegmentClone,
                segmentationLayer.displayState.timestamp.value)
            .then((contactSites) => {
              if (contactSites.length === 0) {
                StatusMessage.showTemporaryMessage(`${firstSegmentClone.toString()} and ${
                    secondSegmentClone.toString()} do not have any contact sites`);
              } else {
                StatusMessage.showTemporaryMessage(
                    `Contact sites between ${firstSegmentClone.toString()} and ${
                        secondSegmentClone.toString()} retrieved!`,
                    5000);
              }
              const annotationColor = new TrackableRGB(vec3.fromValues(0.0, 0.0, 0.0));
              annotationColor.value = vec3.fromValues(Math.random(), Math.random(), Math.random());
              const pairwiseContactSiteGroup = new PairwiseContactSites(
                  firstSegmentClone, secondSegmentClone, contactSites, annotationColor,
                  contactSitesForPairTitle);
              segmentationLayer.contactSites.addContactSiteGroup(pairwiseContactSiteGroup);
              const contactSiteGroup =
                  this.createContactSiteGroupElement(pairwiseContactSiteGroup, false);
              this.groupElement.appendFixedChild(contactSiteGroup);
            });
      }
    });
    this.groupElement.appendFixedChild(getContactSitesButton);
  }

  private createContactSiteGroupElement(
      pairwiseContactSiteGroup: PairwiseContactSites, existingGroup: boolean) {
    const {name: contactSiteGroupName, color: annotationColor, segment1, segment2} =
        pairwiseContactSiteGroup;
    const {segmentationLayer} = this;

    // Create annotation layer
    const annotationLayerForContactSitesPair = new SpontaneousAnnotationLayer(
        segmentationLayer.manager.chunkManager, segmentationLayer.transform, annotationColor);
    setAnnotationHoverStateFromMouseState(
        annotationLayerForContactSitesPair.annotationLayerState,
        segmentationLayer.manager.layerSelectedValues.mouseState);
    annotationLayerForContactSitesPair.renderLayers.forEach(renderLayer => {
      segmentationLayer.addRenderLayer(renderLayer);
    });

    // Create header elements for minimizable group
    // TODO: Move styling to CSS sheet
    const colorWidget =
        annotationLayerForContactSitesPair.registerDisposer(new ColorWidget(annotationColor));
    colorWidget.element.style.height = '1.3em';
    colorWidget.element.style.width = '1.5em';
    colorWidget.element.style.top = '-10%';
    const groupDisplayedOrHidden = new TrackableBoolean(true);
    const showOrHideContactSitesGroupCheckbox =
        new TrackableBooleanCheckbox(groupDisplayedOrHidden);
    annotationLayerForContactSitesPair.registerDisposer(groupDisplayedOrHidden.changed.add(() => {
      if (groupDisplayedOrHidden.value) {
        annotationLayerForContactSitesPair.renderLayers.forEach(renderLayer => {
          renderLayer.ready = true;
        });
      } else {
        annotationLayerForContactSitesPair.renderLayers.forEach(renderLayer => {
          renderLayer.ready = false;
        });
      }
      segmentationLayer.manager.layerManager.layersChanged.dispatch();
    }));
    showOrHideContactSitesGroupCheckbox.element.style.transform = 'scale(1.7)';
    showOrHideContactSitesGroupCheckbox.element.style.verticalAlign = 'bottom';
    const deleteGroupButton = document.createElement('button');
    deleteGroupButton.textContent = 'x';
    deleteGroupButton.style.verticalAlign = 'bottom';

    const minimizableGroupForContactSitesPair = new MinimizableGroupWidgetWithHeader(
        contactSiteGroupName,
        [showOrHideContactSitesGroupCheckbox.element, colorWidget.element, deleteGroupButton]);
    minimizableGroupForContactSitesPair.element.style.marginLeft = '6%';
    deleteGroupButton.addEventListener('click', () => {
      const deleteConfirmed =
          confirm(`Are you sure you want to delete contact sites group ${contactSiteGroupName}?`);
      if (deleteConfirmed) {
        annotationLayerForContactSitesPair.renderLayers.forEach(renderLayer => {
          segmentationLayer.removeRenderLayer(renderLayer);
        });
        annotationLayerForContactSitesPair.dispose();
        removeFromParent(minimizableGroupForContactSitesPair.element);
      }
    });
    if (existingGroup) {
      // Minimize existing groups by default
      const groupContent = minimizableGroupForContactSitesPair.element.getElementsByClassName(
          'neuroglancer-minimizable-group-content');
      groupContent[0].classList.toggle('minimized');
      const groupTitle = minimizableGroupForContactSitesPair.element.getElementsByClassName(
          'neuroglancer-minimizable-group-title');
      groupTitle[0].classList.toggle('minimized');
    }

    const segment1Div = document.createElement('div');
    segment1Div.textContent = `Segment 1: ${segment1.toString()}`;
    segment1Div.classList.add('neuroglancer-select-text');
    const segment2Div = document.createElement('div');
    segment2Div.textContent = `Segment 2: ${segment2.toString()}`;
    segment2Div.classList.add('neuroglancer-select-text');
    minimizableGroupForContactSitesPair.appendFixedChild(segment1Div);
    minimizableGroupForContactSitesPair.appendFixedChild(segment2Div);

    // Create contact site list elements and color change event
    const elementsList = this.createContactSitesUL(
        pairwiseContactSiteGroup, minimizableGroupForContactSitesPair,
        annotationLayerForContactSitesPair, segment1, segment2);
    annotationLayerForContactSitesPair.registerDisposer(colorWidget.model.changed.add(() => {
      elementsList.forEach(element => {
        const positionElement =
            element.querySelector('.neuroglancer-multicut-voxel-coordinates-link');
        (<HTMLElement>positionElement!).style.color = colorWidget.model.toString();
      });
    }));

    return minimizableGroupForContactSitesPair.element;
  }
}

const temp = new Uint64();

export class AllContactSitesForRootWidget extends RefCounted {
  groupElement =
      this.registerDisposer(new MinimizableGroupWidget('Contact Sites (for single root)'));

  constructor(private segmentationLayer: SegmentationUserLayerWithGraph) {
    super();
    const addSegmentLabel = document.createElement('span');
    addSegmentLabel.textContent = 'Enter segment ID: ';
    const addSegmentInput = document.createElement('input');
    addSegmentLabel.appendChild(addSegmentInput);
    const contactSiteNameInput = document.createElement('input');
    const contactSiteNameInputLabel = document.createElement('label');
    contactSiteNameInputLabel.textContent = 'Alias for contact sites: ';
    contactSiteNameInputLabel.appendChild(contactSiteNameInput);
    addSegmentInput.addEventListener('change', () => {
      contactSiteNameInput.placeholder = addSegmentInput.value;
    });
    const getContactSitesButton = document.createElement('button');
    getContactSitesButton.textContent = 'Get contact sites';
    getContactSitesButton.addEventListener('click', () => {
      const validU64 = temp.tryParseString(addSegmentInput.value, 10);
      if (!validU64) {
        StatusMessage.showTemporaryMessage(`${addSegmentInput.value} is not a valid uint64`, 4000);
      } else {
        const rootString = addSegmentInput.value;
        segmentationLayer.chunkedGraphLayer!
            .getContactPartnersForRoot(temp, segmentationLayer.displayState.timestamp)
            .then(
                (contactPartners) => {

                });
      }
    });
    // addSegmentInput.element.style.display = 'inline-block';
    // const addSegmentElement = document.createElement('div');
    // addSegmentElement.appendChild(addSegmentLabel);
    // addSegmentElement.appendChild(addSegmentInput.element);
  }
}