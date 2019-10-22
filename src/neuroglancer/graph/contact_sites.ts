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

import {LocalAnnotationSource} from '../annotation';
import {TrackableRGB} from '../util/color';
import {RefCounted} from '../util/disposable';
import {verifyArray, verifyString, verifyString} from '../util/json';
import {Uint64} from '../util/uint64';

export type ContactSite = {
  coordinate: vec3; area: number;
};

const PAIRWISE_CONTACT_SITES_JSON_KEY = 'pairwiseContactSites';
const ALL_CONTACT_SITES_FOR_ROOT_JSON_KEY = 'contactSitesForRoot';
const SELECTED_SEGMENT1_JSON_KEY = 'selectedSegment1';
const SELECTED_SEGMENT2_JSON_KEY = 'selectedSegment2';
const SELECT_ROOT_SEGMENT_JSON_KEY = 'selectedRoot';



const CONTACT_SITES_GROUP_NAME_JSON_KEY = 'name';

const ROOT_JSON_KEY = 'rootId';
const PARTNERS_JSON_KEY = 'partners';
const PARTNER_ROOT_JSON_KEY = 'partnerId';
const AREAS_JSON_KEY = 'areas';

class PairwiseContactSites extends RefCounted {
  color: TrackableRGB;
  name: string;
  segment1: Uint64;
  segment2: Uint64;
  contactSites: ContactSite[];

  restoreState(specification: any) {}

  toJSON() {}
}

class AllContactSitesForRoot extends RefCounted {
  name: string;
  root: Uint64;
  // Map from each partner root to a list of areas (each contact site is represented by its area
  // here)
  partners: Map<Uint64, number[]>;

  restoreState(specification: any) {
    this.name = verifyString(specification)
  }

  toJSON() {
    const x: any = {};
    x[ROOT_JSON_KEY] = this.root.toJSON();
    x[CONTACT_SITES_GROUP_NAME_JSON_KEY] = name;
    const partnersListJSON: any[] = [];
    for (const [partner, areas] of this.partners) {
      partnersListJSON.push(
          {PARTNER_ROOT_JSON_KEY: partner.toJSON(), AREAS_JSON_KEY: areas.toString()});
    }
    x[PARTNERS_JSON_KEY] = partnersListJSON;
    return x;
  }
}

export class ContactSites extends RefCounted {
  pairwiseContactSitesList: PairwiseContactSites[] = [];
  contactSitesForRootList: AllContactSitesForRoot[] = [];
  selectedSegment1?: Uint64;
  selectedSegment2?: Uint64;
  selectedRoot?: Uint64;

  restoreState(specification: any) {
    const pairwiseContactSitesSpec = specification[PAIRWISE_CONTACT_SITES_JSON_KEY];
    const pairwiseContactSites = verifyArray(pairwiseContactSitesSpec);
    pairwiseContactSites.forEach(contactSitesGroup => {
      const curContactSitesGroupObject = this.registerDisposer(new PairwiseContactSites());
      curContactSitesGroupObject.restoreState(contactSitesGroup);
      this.pairwiseContactSitesList.push(curContactSitesGroupObject);
    });
    const contactSitesForRootsSpec = specification[ALL_CONTACT_SITES_FOR_ROOT_JSON_KEY];
    const contactSitesForRoots = verifyArray(contactSitesForRootsSpec);
    contactSitesForRoots.forEach(contactSitesGroup => {
      const curContactSitesGroupObject = this.registerDisposer(new AllContactSitesForRoot());
      curContactSitesGroupObject.restoreState(contactSitesGroup);
      this.contactSitesForRootList.push(curContactSitesGroupObject);
    });
    const selectedSegment1 = specification[SELECTED_SEGMENT1_JSON_KEY];
    if (selectedSegment1 !== undefined) {
      this.selectedSegment1 = Uint64.parseString(String(selectedSegment1), 10);
    }
    const selectedSegment2 = specification[SELECTED_SEGMENT2_JSON_KEY];
    if (selectedSegment2 !== undefined) {
      this.selectedSegment2 = Uint64.parseString(String(selectedSegment2), 10);
    }
    const selectedRoot = specification[SELECT_ROOT_SEGMENT_JSON_KEY];
    if (selectedRoot !== undefined) {
      this.selectedRoot = Uint64.parseString(String(selectedRoot), 10);
    }
  }

  toJSON() {
    const x: any = {};
    const pairwiseContactSitesJSON: any[] = [];
    this.pairwiseContactSitesList.forEach(contactSitesGroup => {
      pairwiseContactSitesJSON.push(contactSitesGroup.toJSON());
    });
    x[PAIRWISE_CONTACT_SITES_JSON_KEY] = pairwiseContactSitesJSON;
    const contactSitesForRootsJSON: any[] = [];
    this.contactSitesForRootList.forEach(contactSitesGroup => {
      contactSitesForRootsJSON.push(contactSitesGroup.toJSON());
    });
    x[ALL_CONTACT_SITES_FOR_ROOT_JSON_KEY] = contactSitesForRootsJSON;
    if (this.selectedSegment1) {
      x[SELECTED_SEGMENT1_JSON_KEY] = this.selectedSegment1.toJSON();
    }
    if (this.selectedSegment2) {
      x[SELECTED_SEGMENT2_JSON_KEY] = this.selectedSegment2.toJSON();
    }
    if (this.selectedRoot) {
      x[SELECT_ROOT_SEGMENT_JSON_KEY] = this.selectedRoot.toJSON();
    }
    return x;
  }
}
