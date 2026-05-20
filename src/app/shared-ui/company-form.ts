import { Component, input } from '@angular/core';
import {
  FieldTree,
  FormField,
  maxLength,
  minLength,
  pattern,
  required,
  schema,
} from '@angular/forms/signals';
import { Company } from '../core/order/model';

export const companyInfoFormSchema = schema<Company>((path) => {
  required(path.name);
  minLength(path.name, 5, {
    message: ({ state }) => `The minimum length is ${state.minLength?.()} characters`,
  });
  maxLength(path.name, 255, { message: `The company name is too long` });

  pattern(path.taxID, /^[A-Z]{2}[A-Z0-9]{8,12}$/, { message: `Wrong TAX Id format` });
});

@Component({
  selector: 'df-company-info-form',
  imports: [FormField],
  template: ` <fieldset>
    <legend>Company Information</legend>
    <div class="form-field">
      <label for="company-name">Company Name</label>
      <input
        [formField]="form().name"
        id="company-name"
        placeholder="E.g MyCompany GmbH"
        type="text"
        class="form-control"
      />
      @for (error of form().name().errors(); track error.kind) {
        <span class="error">{{ error.message }}</span>
      }
    </div>
    <div class="form-field-group">
      <div class="form-field">
        <label for="country">Country</label>
        <select [formField]="form().country" id="country" class="form-control">
          <option value="">Select country</option>
          <option value="DE">Germany</option>
          <option value="AT">Austria</option>
          <option value="CH">Switzerland</option>
          <option value="CA">Canada</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div class="form-field">
        <label for="tax-id">VAT ID</label>
        <input
          [formField]="form().taxID"
          placeholder="E.g DE123456789"
          id="tax-id"
          type="text"
          class="form-control"
        />
        @for (error of form().taxID().errors(); track error.kind) {
          <span class="error">{{ error.message }}</span>
        }
      </div>
    </div>
  </fieldset>`,
})
export class CompanyInfoForm {
  readonly form = input.required<FieldTree<Company>>();
}
