import { Service } from '@angular/core';
import { ValidationError } from '@angular/forms/signals';
import { Order } from './model';

export interface CustomServerError extends ValidationError {
  relatedField: string
}

@Service()
export class OrderHandler {
  async placeOrder(order: Order): Promise<void> {
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    console.log(order);
  }
  async placeOrderAndFail(order?: Order): Promise<ValidationError> {
    try {
      return await new Promise<ValidationError>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Whoops! Something went wrong on the server`))
        }, 1000);
      });
    } catch (e: unknown) {
      return {
        kind: 'serverError',
        message: (e as Error).message
      }
    }
  }
  async placeOrderAndFailEmail(order?: Order): Promise<CustomServerError> {
    try {
      return await new Promise<ValidationError & { relatedField: string }>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`This user reached order limits`))
        }, 1000);
      });
    } catch (e: unknown) {
      return {
        kind: 'serverError',
        relatedField: 'email',
        message: (e as Error).message
      }
    }
  }
}
