import { FormConfig } from './model';

export const FORM_CONFIG: FormConfig = {
  title: 'Simple Dynamic Form',
  controls: [
    {
      kind: 'text',
      name: 'fullName',
      label: 'Full Name',
    },
    {
      kind: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
    },
  ],
};
