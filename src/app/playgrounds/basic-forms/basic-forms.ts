import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

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
  });
  protected readonly form = form(
    this.#orderModel,
    (path) => {
      // validators & control behavior
    },
    {
      // form config
    },
  );

  constructor() {}
}
