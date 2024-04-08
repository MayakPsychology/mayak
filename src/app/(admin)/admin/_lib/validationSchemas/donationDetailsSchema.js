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
    .string()
    .refine(value => value.length === REGISTER_ID_LENGTH && !Number.isNaN(Number(value)), {
      message: `Код ЄДРПОУ має містити тільки цифри та мати довжину ${REGISTER_ID_LENGTH} символів`,
    }),
  paymentPurpose: zString,
  isQREnabled: zBoolean,
  qrLink: zUrl,
});
