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

import './autocomplete_atlas.css';
import { AutocompleteTextInput, Completer} from './autocomplete';
import {RefCounted} from 'neuroglancer/util/disposable';
import {Signal} from 'neuroglancer/util/signal';
import {Uint64} from 'neuroglancer/util/uint64';
import {CompletionWithDescription} from 'neuroglancer/util/completion';
import {EventActionMap, KeyboardEventBinder, registerActionListener} from 'neuroglancer/util/keyboard_bindings';

export type Completion = CompletionWithDescription;

const keyMap = EventActionMap.fromObject({
  'tab': {action: 'choose-active-completion-or-prefix', preventDefault: false},
  'enter': {action: 'choose-active-completion', preventDefault: false},
  'escape': {action: 'cancel', preventDefault: false, stopPropagation: false},
});

export interface CompletionResult {
  offset: number;
  completions: Completion[];
}

export class DataAtlasProvider extends RefCounted {
  dataAtlas = new Map<string, number>();
  

  register(atlas: Map<number, string> ) {
    for (let [key, value] of atlas) {
      this.dataAtlas.set(value,key)
  }
}

  regionCompleter(name: string):
      Promise<CompletionResult> {
        let completions: Completion[] = [];

      for (let [key, value] of this.dataAtlas) {
        if (key.toLowerCase().includes(name.toLowerCase())) {
          completions.push({value: key, description: value.toString()});
        }
      }
      return Promise.resolve({offset: 0, completions});
   
    }

}

export class AutocompleteTextInputAtlas extends AutocompleteTextInput {
  element: HTMLDivElement;
  promptElement: HTMLLabelElement;
  inputWrapperElement: HTMLDivElement;
  inputElement: HTMLInputElement;
  hintElement: HTMLInputElement;
  dropdownElement: HTMLDivElement;
  inputChanged = new Signal<(value: string) => void>();
  valuesEntered = new Signal<(values: Uint64[]) => void>();
  dataAtlasProvider = new DataAtlasProvider();

  constructor(options: {completer: Completer, delay?: number}) {
    super(options);
    let inputElement = this.inputElement

    const keyboardHandler = this.registerDisposer(new KeyboardEventBinder(inputElement, keyMap));
    keyboardHandler.allShortcutsAreGlobal = true;

    this.registerEventListener(
      this.dropdownElement, 'mousedown', this.handleDropdownMousedown2.bind(this));

    registerActionListener(
        inputElement, 'choose-active-completion-or-prefix', (event: CustomEvent) => {
          this.handleInputEntered()
          if (this.selectActiveCompletion(/*allowPrefix=*/true)) {

            event.preventDefault();
          }
        });


    registerActionListener(inputElement, 'choose-active-completion', (event: CustomEvent) => {
      this.handleInputEntered()
      if (this.selectActiveCompletion(/*allowPrefix=*/false)) {
        event.preventDefault();
      }
    });


  }

  handleInputEntered() {
  const values = this.validateInput();
      if (values !== undefined) {
        this.inputElement.value = '';
        this.inputElement.classList.remove('valid-input', 'invalid-input');
        this.valuesEntered.dispatch(values);
        this.value = '';
        this.element.blur();
        this.inputElement.blur();
      }
    }

  handleDropdownMousedown2(event: MouseEvent) {
    this.handleInputEntered()
    event.preventDefault();
  }

  registerAtlasProvider(atlasProvider: DataAtlasProvider ) {
    this.dataAtlasProvider = atlasProvider
  }

  validateInput(): Uint64[]|undefined {
    let textinput = this.inputElement.value;

    const results: Uint64[] = [];
    if (this.dataAtlasProvider.dataAtlas.has(textinput))
    {
      const x = new Uint64(this.dataAtlasProvider.dataAtlas.get(textinput), 0)
      results.push(x);

    }

    return results;
  }


}


