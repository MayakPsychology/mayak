import { z } from 'zod';
import iban from 'iban';
import { MESSAGES, zBoolean, zString, zUrl } from './common';

export const DonationDetailsSchema = z.object({
  donationEnabled: zBoolean,
  title: z
    .string({
      required_error: MESSAGES.requiredField,
      invalid_type_error: MESSAGES.requiredField,
    })
    .trim(),
  subtitle: z
    .string({
      required_error: MESSAGES.requiredField,
      invalid_type_error: MESSAGES.requiredField,
    })
    .max(50, {
      message: 'Довжина підзаголовку не повинна перевищувати 50-ти символів',
    }),
  subtitleEnabled: zBoolean,
  paypalLink: zUrl,
  paypalLinkEnabled: zBoolean,
  privatLink: zUrl,
  privatLinkEnabled: zBoolean,
  bankDetailsEnabled: zBoolean,
  enterpriceName: zString,
  iban: zString.refine(value => iban.isValid(value), {
    message: 'Invalid IBAN',
  }),
  enterpriseRegisterId: z.string().refine(value => value.length === 8 && !Number.isNaN(Number(value)), {
    message: 'Код ЄДРПОУ має містити тільки цифри та мати довжину 8 символів',
  }),
  paymentPurpose: zString,
  qrLink: zUrl,
});
