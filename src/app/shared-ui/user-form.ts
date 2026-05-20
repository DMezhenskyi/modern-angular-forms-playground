import { Component } from '@angular/core';
import { FormField, schema } from '@angular/forms/signals';

export const userFormInfoSchema = schema((path) => {
  // reusable schema
});

@Component({
  selector: 'df-user-info-form',
  imports: [FormField],
  template: ` <!-- NESTED FORM SHOULD BE HERE --> `
})
export class UserInfoForm {}