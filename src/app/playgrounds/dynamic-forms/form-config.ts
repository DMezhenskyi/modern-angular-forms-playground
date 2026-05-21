import { FormConfig } from './model';

export const FORM_CONFIG: FormConfig = {
  title: 'Simple Dynamic Form',
  controls: [
    {
      kind: 'text',
      name: 'fullName',
      label: 'Full Name',
      placeholder: 'E.g John Johns',
    },
    {
      kind: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      type: 'email',
    },
  ],

  // TASK 3: Extend config with fields for number and select
  //         You can use country and item count fields from the block 1
};
