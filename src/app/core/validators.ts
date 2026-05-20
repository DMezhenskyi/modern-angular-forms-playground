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
    when?: LogicFn<string, boolean>;
    message?: string;
  },
) {
  validate(path, (ctx) => {
    const APPLY_VALIDATION = config?.when ? config.when(ctx) : true;
    if (!APPLY_VALIDATION) return;

    const disallowedValue = disallowedValues.find((v) => v === ctx.value());

    if (disallowedValue) {
      return {
        kind: 'disallowed-username',
        message: config?.message ?? `The value "${disallowedValue}" is not allowed.`,
      };
    }
    return;
  });
}
