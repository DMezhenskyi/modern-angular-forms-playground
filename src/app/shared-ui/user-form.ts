import { Component, input } from '@angular/core';
import { email, FieldTree, FormField, minLength, required, schema } from '@angular/forms/signals';
import { User } from '../core/order/model';

export const userFormInfoSchema = schema<User>((path) => {
  required(path.fullName, { message: `This field is required` });
  minLength(path.fullName, 5, {
    message: ({ state }) => `The minimum length is ${state.minLength?.()} characters`
  });
  email(path.email, { message: `The provided email isn't valid` });
});

@Component({
  selector: 'df-user-info-form',
  imports: [FormField],
  template: `
  <fieldset>
    <legend>User Information</legend>
      <div class="form-field">
        <label for="name">Full Name</label>
        <input [formField]="form().fullName" id="name" placeholder="E.g Jane Doe" type="text" class="form-control" />
        @for (error of form().fullName().errors(); track error.kind) {
          <span class="error">{{error.message}}</span>
        }
      </div>
    
      <div class="form-field">
        <label for="email">Email</label>
        <input [formField]="form().email" id="email" type="email" class="form-control" />
        @for (error of form().email().errors(); track error.kind) {
          <span class="error">{{error.message}}</span>
        }
      </div>  
  </fieldset>
  `
})
export class UserInfoForm {
  form = input.required<FieldTree<User>>()
}