import { Component, computed, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, max, min, minLength, required, submit } from '@angular/forms/signals';

import { Order } from '../../core/order/model';
import { OrderHandler } from '../../core/order/order-handler';

@Component({
  selector: 'df-basic-forms',
  styleUrls: ['./basic-forms.scss'],
  templateUrl: './basic-forms.html',
  imports: [FormField, FormRoot],
})
export default class BasicForms {
  readonly #orderHandler = inject(OrderHandler);
  readonly #orderModel = signal<Order>({
    fullName: '',
    email: '',
    itemCount: null
  });
  protected readonly form = form(
    this.#orderModel,
    (path) => {
      required(path.fullName, { message: `This field is required` });
      minLength(path.fullName, 5, {
        message: ({ state }) => `The minimum length is ${state.minLength?.()} characters`
      });
      email(path.email, { message: `The provided email isn't valid` });
      required(path.itemCount, { message: `This field is required` });
      min(path.itemCount, 1, { message: `Amount is too small` });
      max(path.itemCount, 30, { message: `Amount is too large` });
    },
    {
      submission: {
        action: async (form) => {
          // TASK 1: Handle submition error and return it from the handler function
          //         in order to bind it to the root FieldTree form state
          // NOTE: `OrderHandler.placeOrderAndFail()` method returns error in a proper 
          // format required by signal forms. 
          return await this.#orderHandler.placeOrderAndFail(form().value())

          // TASK 3*: Handle submition error and map it with failed field
          // NOTE: To simulate this error use `OrderHandler.placeOrderAndFailEmail()` method
          //       this method returns extended ValidationError with a key of the field that is failed (email)
          //       your goal is to map this error to the email field
          form().reset();
        }
      }
    }
  );

  protected readonly isSubmitting = computed(
    () => this.form().submitting()
  )
  protected readonly buttonText = computed(
    () => this.isSubmitting() ? `Submitting...` : `Submit`
  )

  constructor() { }

}
