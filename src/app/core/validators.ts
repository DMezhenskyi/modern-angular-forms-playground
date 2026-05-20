import { LogicFn, SchemaPath, validate } from '@angular/forms/signals';
import { Company } from './order/model';

export function VATCorrespondsCountry(
  path: SchemaPath<string>,
  config: {
    country: LogicFn<string, Company['country']>;
    message?: string;
  },
) {
  validate(path, (ctx) => {
    const foundEUCountryISO = ['AT', 'DE', 'CH'].find((c) => config.country(ctx) === c);

    if (foundEUCountryISO) {
      if (ctx.value() && !ctx.value().startsWith(foundEUCountryISO)) {
        return {
          kind: 'wrong-vat-id-country',
          message: config?.message || `This VAT ID doesn't match the country`,
        };
      }
    }
    return;
  });
}

export function disallowedValues(
  path: SchemaPath<string>,
  disallowedValues: string[],
  config?: {
    message: string;
  },
) {
  validate(path, (ctx) => {
    // TASK 1: implement a validator logic which prevents usage of certain words e.g 'test', 'admin', 'dummy', etc
    //         If user enters a string listed in the `disallowedValues` array, validator should return an error
    //         that this word isn't allowed. The validator should support optional custom message.
    //         The validator should support `when` condition,
    //         Usage example: disallowedValues(['admin', 'dummy'])
    const disallowedValue = disallowedValues.find((v) => v === ctx.value());

    if (disallowedValue) {
      return {
        kind: 'disallowed-username',
        message: config?.message ?? `The value "${disallowedValue}" is not allowed.`,
      };
    }
    return;
    // TASK 3: Implement support of `when` condition, likewise required(p, {when: (ctx) => ...})
  });
}
