import { FieldTree, SchemaFn } from '@angular/forms/signals';
import { FormConfig, FieldConfig } from './model';

export type FormModel = Record<string, string | boolean | number | null>;

export function buildModel(fieldConfigs: FieldConfig[]): FormModel {
  const model: FormModel = {};

  return model;
}

export function buildSchema(fieldConfigs: FieldConfig[]): SchemaFn<FormModel> {
  return (path) => {};
}

export function submitForm<T>(form: FieldTree<T>) {
  form().reset();
  console.log('Placing order', form().value());
  return;
}
