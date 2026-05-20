import { Component, signal } from '@angular/core';
import { email, form, FormField, max, min, minLength, required } from '@angular/forms/signals';

import { Order } from '../../core/order/model';

@Component({
  selector: 'df-basic-forms',
  styleUrls: ['./basic-forms.scss'],
  templateUrl: './basic-forms.html',
  imports: [FormField],
})
export default class BasicForms {
  readonly #orderModel = signal<Order>({
    fullName: '',
    email: '',
    // TASK 2: add the new itemCount property to the model
    // and set initial value to it'
    itemCount: null
  });
  protected readonly form = form(
    this.#orderModel,
    (path) => {
      required(path.fullName, { message: `This field is required` });
      // *TASK 6: Apply minLength(3) validator to fullName field
      // resolve error mesage dynamically shows how many characters allowed for the field
      // e.g instead `The length is too short` -> `The minimum length is 3 characters` 
      minLength(path.fullName, 5, {
        message: ({ state }) => `The minimum length is ${state.minLength?.()} characters`
      });
      email(path.email, { message: `The provided email isn't valid` });

      // TASK 4: Apply validators to itemCount
      // make it required
      // allow to enter value between 1 and 30
      // use required, min and max validators
      required(path.itemCount, { message: `This field is required` });
      min(path.itemCount, 1, { message: `Amount is too small` });
      max(path.itemCount, 30, { message: `Amount is too large` });
    },
    {
      // form config
    },
  );

  constructor() { }
}
