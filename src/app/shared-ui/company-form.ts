import { Component } from '@angular/core';
import { FormField, schema } from '@angular/forms/signals';

export const companyInfoFormSchema = schema((path) => {
  // reusable schema
});

@Component({
  selector: 'df-company-info-form',
  imports: [FormField],
  template: ` <!-- NESTED FORM SHOULD BE HERE --> `,
})
export class CompanyInfoForm {
  // TASK 4: Create a required input with a proper FieldTree type and update the component view bindings
}
