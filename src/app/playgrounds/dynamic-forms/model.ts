export interface FormConfig {
  title: string;
  controls: FieldConfig[];
}

export interface BaseFieldConfig {
  name: string;
  label?: string;
  required?: boolean;
}
export interface InputFieldConfig extends BaseFieldConfig {
  type?: string; // e.g., 'text', 'email'
  placeholder?: string;
}
export interface TextFieldConfig extends InputFieldConfig {
  kind: 'text';
  value?: string;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
}

export type FieldConfig = TextFieldConfig; // <-- TIP: should be union type of all supported control configs
