import { Component, computed, inject, signal } from '@angular/core';
import { email, form, FormField, max, min, minLength, required, submit } from '@angular/forms/signals';

import { Order } from '../../core/order/model';
import { OrderHandler } from '../../core/order/order-handler';

@Component({
  selector: 'df-basic-forms',
  styleUrls: ['./basic-forms.scss'],
  templateUrl: './basic-forms.html',
  imports: [FormField],
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
      // form config
    },
  );

  protected readonly isSubmitting = computed(
    () => false
  )
  protected readonly buttonText = computed(
    () => `Submit`
  )


  constructor() { }

  protected submitForm(e: Event) {
    e.preventDefault();

    // submit(
    //   this.form,
    //   async (form) => {
    //     await this.#orderHandler.placeOrder(form().value())
    //     form().reset();
    //   }) 
  }
}
