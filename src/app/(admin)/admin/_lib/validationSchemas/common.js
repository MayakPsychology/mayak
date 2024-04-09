import { z } from 'zod';

export const MESSAGES = {
  requiredField: `Обов'язкове поле`,
  unacceptableValue: 'Недопустиме значення',
  singlePrimaryAddress: 'Необхідно вказати одну головну адресу',
};

export const zString = z
  .string({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.requiredField,
  })
  .trim();

export const zUrl = zString.url({ message: MESSAGES.unacceptableValue });

export const zBoolean = z.boolean({
  required_error: MESSAGES.requiredField,
  invalid_type_error: MESSAGES.requiredField,
});
