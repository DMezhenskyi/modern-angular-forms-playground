import { Component, computed, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, max, maxLength, min, minLength, pattern, required, submit } from '@angular/forms/signals';

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
    itemCount: null,
    companyName: '',
    country: '',
    taxID: ''
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

      required(path.companyName);
      minLength(path.companyName, 5, {
        message: ({ state }) => `The minimum length is ${state.minLength?.()} characters`
      });
      maxLength(path.companyName, 255, {message: `The company name is too long`})

      pattern(path.taxID, /^[A-Z]{2}[A-Z0-9]{8,12}$/, {message: `Wrong TAX Id format`})
    },
    {
      submission: {
        action: async (form) => await this.#orderHandler.placeOrder(form().value())
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
