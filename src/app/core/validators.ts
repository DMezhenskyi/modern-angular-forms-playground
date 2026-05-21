import { createMetadataKey, LogicFn, metadata, SchemaPath, validate } from '@angular/forms/signals';
import { Company } from './order/model';
import { EU_COUNTRIES } from '../shared-ui/company-form';

export function VATCorrespondsCountry(
  path: SchemaPath<string>,
  config: {
    country: LogicFn<string, Company['country']>;
    message?: string;
  },
) {
  validate(path, (ctx) => {
    const countries = ctx.state.metadata(EU_COUNTRIES)?.() ?? [];
    const foundEUCountryISO = countries.find((c) => config.country(ctx) === c);

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

// TASK 1: Create a global DISALLOWED_VALUES metadata token for disallowedValues
export const DISALLOWED_VALUES = createMetadataKey<string[]>();

export function disallowedValues(
  path: SchemaPath<string>,
  disallowedValues: string[],
  config?: {
    when?: LogicFn<string, boolean>;
    message?: string;
  },
) {
  // TASK 2: Set metadata for a token created in the previous step
  //         disallowedValues use as a value for the metadata token
  metadata(path, DISALLOWED_VALUES, (ctx) => {
    // TIP: this logic could be also memoized and extracted as internal metadata.
    const APPLY_VALIDATION = config?.when ? config.when(ctx) : true;
    return APPLY_VALIDATION ? disallowedValues : [];
  });

  validate(path, (ctx) => {
    const APPLY_VALIDATION = config?.when ? config.when(ctx) : true;
    if (!APPLY_VALIDATION) return;

    // TASK 3: Reference the DISALLOWED_VALUES token in the field metadata
    //         instead of directly access disallowedValues variable
    const values = ctx.state.metadata(DISALLOWED_VALUES)!() ?? [];
    const disallowedValue = values.find((v) => v === ctx.value());

    if (disallowedValue) {
      return {
        kind: 'disallowed-username',
        message: config?.message ?? `The value "${disallowedValue}" is not allowed.`,
      };
    }
    return;
  });
}
