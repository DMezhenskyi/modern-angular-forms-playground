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

// TASK 1: Create interfaces for NumberFieldConfig, SelectFieldConfig
//         define corresponding fields there and types e.g kind: 'number'; kind: 'select'; and other attributes like
//         min, max, options, etc

export type FieldConfig = TextFieldConfig; // <-- TIP: should be union type of all supported control configs

// TASK 2: Add created interfaces to the union type like ... NumberFieldConfig | SelectFieldConfig
