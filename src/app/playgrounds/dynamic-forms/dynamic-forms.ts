import { Component, computed, signal } from '@angular/core';
import { Field, form, FormField, FormRoot } from '@angular/forms/signals';
import { FormConfig } from './model';
import { FORM_CONFIG } from './form-config';
import { buildModel, submitForm } from './utils';

@Component({
  selector: 'df-dynamic-forms',
  styleUrls: ['./dynamic-forms.scss'],
  templateUrl: './dynamic-forms.html',
  imports: [FormField, FormRoot],
})
export default class DynamicForms {
  readonly #config = signal<FormConfig>(FORM_CONFIG);

  protected readonly controlConfigs = computed(() => this.#config().controls);

  readonly #formModel = signal(buildModel(this.controlConfigs()));

  protected readonly form = form(this.#formModel, (path) => {}, {
    submission: { action: async (form) => submitForm(form) },
  });

  protected readonly buttonText = computed(() =>
    this.form().submitting() ? 'Processing...' : 'Submit',
  );

  protected asTextField(name: string) {
    return this.form[name] as unknown as Field<string>;
  }

  // TASK 4: Add 2 additional field resolver methods for number and select fields

  constructor() {}
}
