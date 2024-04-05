import { z } from 'zod';
import iban from 'iban';
import { zBoolean, zString, zUrl } from './common';

export const DonationDetailsSchema = z.object({
  donationEnabled: zBoolean,
  title: zString.max(128, {
    message: 'Довжина заголовку не повинна перевищувати 128 символів',
  }),
  subtitle: zString.max(50, {
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
    message: 'Введіть коректний IBAN',
  }),
  enterpriseRegisterId: z.string().refine(value => value.length === 8 && !Number.isNaN(Number(value)), {
    message: 'Код ЄДРПОУ має містити тільки цифри та мати довжину 8 символів',
  }),
  paymentPurpose: zString,
  qrEnabled: zBoolean,
  qrLink: zUrl,
});
