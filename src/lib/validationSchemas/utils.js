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
  number: {
    type: `${fieldName} має бути числом`,
    min: value => `${fieldName} має бути не менше ${value}`,
    max: value => `${fieldName} має бути не більше ${value}`,
    integer: `${fieldName} має бути цілим числом`,
    halfStep: `${fieldName} має бути кратне 0.5`,
  },
  email: {
    format: `${fieldName} - невірний формат пошти`,
  },
  url: {
    format: `${fieldName} - невірний формат веб-адреси`,
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
  email: () => string(fieldName, schema.email({ message: errors(fieldName).email.format })),
  url: () => string(fieldName, schema.url({ message: errors(fieldName).url.format })),
  nullish: () => string(fieldName, schema.nullish()),
  nullable: () => string(fieldName, schema.nullable()),
  optional: () =>
    string(
      fieldName,
      z.preprocess(val => {
        if (val === '' || val === null) return undefined;
        return val;
      }, schema.optional()),
    ),
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

export const array = (fieldName, itemSchema, options) => {
  let schema = z.array(itemSchema, { required_error: errors(fieldName).required });

  if (options?.min) {
    schema = schema.min(options.min, {
      message: options?.message,
    });
  }

  return {
    zod: schema,
  };
};

export const number = (
  fieldName,
  schema = z.preprocess(
    val => (val == null ? undefined : Number(val)), // преобразуем null/строку в число
    z.number({
      required_error: errors(fieldName).required,
      invalid_type_error: errors(fieldName).number?.format ?? `${fieldName} має бути числом`,
    }),
  ),
) => ({
  min: minValue =>
    number(
      fieldName,
      schema.refine(val => val >= minValue, { message: errors(fieldName).number.min(minValue) }),
    ),
  max: maxValue =>
    number(
      fieldName,
      schema.refine(val => val <= maxValue, { message: errors(fieldName).number.max(maxValue) }),
    ),
  integer: () =>
    number(
      fieldName,
      schema.refine(val => Number.isInteger(val), { message: errors(fieldName).number.integer }),
    ),
  halfStep: () =>
    number(
      fieldName,
      schema.refine(val => Number.isInteger(val * 2), { message: errors(fieldName).number.halfStep }),
    ),
  optional: () => number(fieldName, schema.optional()),
  nullish: () => number(fieldName, schema.nullish()),
  zod: schema,
});

export const regexField = (fieldName, regex, expectedFormat, required = false) => {
  let base = string(fieldName).nullable();

  const message = errors(fieldName).format(expectedFormat);

  if (required) {
    base = base.zod
      .refine(val => val !== null && val.trim() !== '', { message: errors(fieldName).nonEmpty })
      .refine(val => regex.test(val), { message });
  } else {
    base = base.zod.refine(val => !val || regex.test(val), { message });
  }

  return base;
};
