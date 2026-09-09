import { z } from 'zod';
import { FormatOfWork, OwnershipType } from '@prisma/client';
import { string, number, array } from '@/lib/validationSchemas/utils';
import {
  zClientsSchema,
  zContactsShape,
  zCreateAddressSchema,
  zDiscountsShape,
  zSocialLinkSchema,
  zSubmitterContactShape,
  zSupportFocusesField,
  zWorkDaySchema,
  zFilesField,
  refineDiscounts,
} from './common';

const CHOOSE_AN_ANSWER = 'Оберіть відповідь';

export const organizationApplicationStep1Schema = z.object({
  name: string('Назва організації').min(2).max(128).zod,
  type: array('Типи організації', string('Тип організації').zod, {
    min: 1,
    message: 'Потрібно обрати щонайменше 1 тип організації',
  }).zod,
  typeNames: z.string().array().optional(),
  ownershipType: z.enum(Object.values(OwnershipType), {
    required_error: 'Оберіть форму власності',
    invalid_type_error: 'Оберіть форму власності',
  }),
  yearsOnMarket: number('Роки на ринку').min(0).integer().zod,
  yearsOfExperience: number('Стаж').min(0).integer().nullish().zod,
  experience: string('Досвід та спеціалізація').min(10).max(5000).zod,
  ...zContactsShape,
  socialLink: zSocialLinkSchema,
  description: string('Опис').min(10).max(5000).zod,
});

export const organizationApplicationStep2Schema = z.object({
  // three-way answer from the mocks: так / ні / працюємо виключно онлайн
  isInclusiveSpace: z.enum(['yes', 'no', 'online'], {
    required_error: CHOOSE_AN_ANSWER,
    invalid_type_error: CHOOSE_AN_ANSWER,
  }),
  formatOfWork: z.enum(Object.values(FormatOfWork), {
    required_error: 'Оберіть формат роботи',
    invalid_type_error: 'Оберіть формат роботи',
  }),
  addresses: array('Адреси', zCreateAddressSchema).zod,
  workTime: array('Графік роботи', zWorkDaySchema).zod,
});

export const organizationApplicationStep3Schema = z.object({
  expertSpecializations: array('Спеціалізації працівників', string('Спеціалізація').zod, {
    min: 1,
    message: 'Потрібно обрати щонайменше 1 спеціалізацію',
  }).zod,
  expertSpecializationNames: z.string().array().optional(),
  clients: zClientsSchema,
});

const organizationApplicationStep4Shape = z.object({
  ...zDiscountsShape,
  // "так" / "ні" / "інше:" — the last one keeps its explanation in freeReceptionOther
  isFreeReception: z.union([z.boolean(), z.literal('other')], {
    required_error: CHOOSE_AN_ANSWER,
    invalid_type_error: CHOOSE_AN_ANSWER,
  }),
  freeReceptionOther: string('Безкоштовні сесії').max(500).optional().zod,
  supportFocuses: zSupportFocusesField,
});

const refineFreeReception = (data, ctx) => {
  if (data.isFreeReception === 'other' && !data.freeReceptionOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Опишіть, які саме безкоштовні сесії Ви надаєте',
      path: ['freeReceptionOther'],
    });
  }
};

export const organizationApplicationStep4Schema = organizationApplicationStep4Shape
  .superRefine(refineDiscounts)
  .superRefine(refineFreeReception);

// "Відповідність організації баченню платформи" — kept for the admins, never published.
const organizationApplicationStep5Shape = z.object({
  specialistSelection: string('Відбір спеціалістів').min(10).max(2000).zod,
  averageExperience: string('Середній досвід').min(1).max(500).zod,
  achievements: string('Досягнення').min(10).max(2000).zod,
  workMethods: string('Методи роботи').min(10).max(2000).zod,
  developmentPolicy: z.enum(['no', 'other'], {
    required_error: CHOOSE_AN_ANSWER,
    invalid_type_error: CHOOSE_AN_ANSWER,
  }),
  developmentPolicyOther: string('Політика професійного розвитку').max(2000).optional().zod,
  supervisionPolicy: z.enum(['no', 'other'], {
    required_error: CHOOSE_AN_ANSWER,
    invalid_type_error: CHOOSE_AN_ANSWER,
  }),
  supervisionPolicyOther: string('Супервізії та інтервізії').max(2000).optional().zod,
  ethicalControl: string('Етичний контроль').min(10).max(2000).zod,
  feedbackCollection: string('Зворотній звʼязок').min(10).max(2000).zod,
  documentFiles: zFilesField,
});

const refineOtherPolicies = (data, ctx) => {
  [
    ['developmentPolicy', 'developmentPolicyOther', 'Коротко опишіть політику професійного розвитку'],
    ['supervisionPolicy', 'supervisionPolicyOther', 'Коротко опишіть вимоги до супервізій та інтервізій'],
  ].forEach(([field, otherField, message]) => {
    if (data[field] === 'other' && !data[otherField]) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [otherField] });
    }
  });
};

export const organizationApplicationStep5Schema = organizationApplicationStep5Shape.superRefine(refineOtherPolicies);

export const organizationSubmitterContactSchema = z.object(zSubmitterContactShape);

export const organizationApplicationFullSchema = organizationApplicationStep1Schema
  .merge(organizationApplicationStep2Schema)
  .merge(organizationApplicationStep3Schema)
  .merge(organizationApplicationStep4Shape)
  .merge(organizationApplicationStep5Shape)
  .merge(organizationSubmitterContactSchema)
  .superRefine((data, ctx) => {
    if (data.formatOfWork !== FormatOfWork.ONLINE && !data.addresses.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Необхідно вказати мінімум одне місце надання послуг',
        path: ['addresses'],
      });
    }
  })
  .superRefine(refineDiscounts)
  .superRefine(refineFreeReception)
  .superRefine(refineOtherPolicies);
