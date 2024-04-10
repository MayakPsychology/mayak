import { z } from 'zod';
import iban from 'iban';
import { REGISTER_ID_LENGTH } from '@admin/_lib/consts';
import { zBoolean, zString, zUrl } from './common';

export const DonationDetailsSchema = z.object({
  isDonationEnabled: zBoolean,
  title: zString.max(128, {
    message: 'Довжина заголовку не повинна перевищувати 128 символів',
  }),
  subtitle: zString.max(50, {
    message: 'Довжина підзаголовку не повинна перевищувати 50-ти символів',
  }),
  isSubtitleEnabled: zBoolean,
  paypalLink: zUrl,
  isPayPalLinkEnabled: zBoolean,
  privatLink: zUrl,
  isPrivatLinkEnabled: zBoolean,
  isBankDetailsEnabled: zBoolean,
  enterpriceName: zString,
  iban: zString.refine(value => iban.isValid(value), {
    message: 'Введіть коректний IBAN',
  }),
  enterpriseRegisterId: z
    .number({
      invalid_type_error: 'Код ЄДРПОУ має бути числом',
      required_error: "Код ЄДРПОУ є обов'язковим",
    })
    .int({
      message: 'Код ЄДРПОУ має бути цілим числом',
    })
    .positive({
      message: 'Код ЄДРПОУ має бути додатнім числом',
    })
    .refine(value => String(value).length === REGISTER_ID_LENGTH, {
      message: `Код ЄДРПОУ має містити тільки цифри та мати довжину ${REGISTER_ID_LENGTH} символів`,
    }),
  paymentPurpose: zString,
  isQREnabled: zBoolean,
  qrLink: zUrl,
});
