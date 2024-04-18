import { z } from 'zod';

function numberForm(value) {
  const number = Number(String(value).at(-1));
  if (Number.isNaN(number)) return '';
  if (number === 1) return 'символ';
  if (number > 1 && number < 5) return 'символи';
  return 'символів';
}

export const errors = fieldName => ({
  required: `${fieldName} - обов'язкове поле`,
  nonEmpty: `${fieldName} - не може бути пустим`,
  format: expected => `${fieldName} - формат має бути ${expected}`,
  string: {
    type: `${fieldName} має бути рядком`,
    min: length => `${fieldName} має містити не менше ніж ${length} ${numberForm(length)}`,
    max: length => `${fieldName} має містити не більше ніж ${length} ${numberForm(length)}`,
  },
  date: {
    format: `${fieldName} - невірний формат дати`,
    min: date => `${fieldName} не може бути ранішою за ${date}`,
  },
  boolean: {
    format: `${fieldName} - має бути булевим значенням`,
  },
});

export const string = (
  fieldName,
  schema = z
    .string({
      required_error: errors(fieldName).required,
      invalid_type_error: errors(fieldName).string.type,
    })
    .trim(),
) => ({
  min: minLength => string(fieldName, schema.min(minLength, { message: errors(fieldName).string.min(minLength) })),
  max: maxLength => string(fieldName, schema.max(maxLength, { message: errors(fieldName).string.max(maxLength) })),
  email: () => string(fieldName, schema.email()),
  nullish: () => string(fieldName, schema.nullish()),
  optional: () => string(fieldName, schema.optional()),
  zod: schema,
});

export const date = (
  fieldName,
  schema = z.coerce.date({
    required_error: errors(fieldName).required,
    invalid_type_error: errors(fieldName).date.format,
  }),
) => ({
  min: d => date(fieldName, schema.min(d, { message: errors(fieldName).date.min(d) })),
  zod: schema,
});

export const boolean = (
  fieldName,
  schema = z.boolean({
    required_error: errors(fieldName).required,
    invalid_type_error: errors(fieldName).boolean.format,
  }),
) => ({
  zod: schema,
});

export const array = (fieldName, itemSchema) => ({
  zod: z.array(itemSchema, { required_error: errors(fieldName).required }),
});
