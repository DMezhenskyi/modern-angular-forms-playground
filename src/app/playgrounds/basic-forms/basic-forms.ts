import { Component, computed, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  FormRoot,
  max,
  min,
  required,
  apply,
  applyWhen,
  hidden,
} from '@angular/forms/signals';

import { Order } from '../../core/order/model';
import { OrderHandler } from '../../core/order/order-handler';
import { userFormInfoSchema, UserInfoForm } from '../../shared-ui/user-form';
import { CompanyInfoForm, companyInfoFormSchema } from '../../shared-ui/company-form';

@Component({
  selector: 'df-basic-forms',
  styleUrls: ['./basic-forms.scss'],
  templateUrl: './basic-forms.html',
  imports: [FormField, FormRoot, UserInfoForm, CompanyInfoForm],
})
export default class BasicForms {
  readonly #orderHandler = inject(OrderHandler);

  readonly #orderModel = signal<Order>({
    user: {
      fullName: '',
      email: '',
    },
    company: {
      name: '',
      country: '',
      taxID: '',
    },
    itemCount: null,
    businessPurchase: true,
  });
  protected readonly form = form(
    this.#orderModel,
    (path) => {
      apply(path.user, userFormInfoSchema);

      // TASK 1: Make email a required field when this is a business purchase

      required(path.itemCount, { message: `This field is required` });
      min(path.itemCount, 1, { message: `Amount is too small` });
      max(path.itemCount, 30, { message: `Amount is too large` });

      // TASK 2: Hide the "Company Information" section when this is NOT a business purchase

      applyWhen(path.company, (ctx) => ctx.valueOf(path.businessPurchase), companyInfoFormSchema);
    },
    {
      submission: {
        action: async (form) => await this.#orderHandler.placeOrder(form().value()),
      },
    },
  );

  protected readonly isSubmitting = computed(() => this.form().submitting());
  protected readonly buttonText = computed(() =>
    this.isSubmitting() ? `Submitting...` : `Submit`,
  );

  constructor() {}
}
