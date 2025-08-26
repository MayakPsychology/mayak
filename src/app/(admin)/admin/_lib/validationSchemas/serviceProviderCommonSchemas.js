import { z } from 'zod';
import { FormatOfWork } from '@prisma/client';
import { MAX_NUM_SELECTED_SOCIAL_LINKS, WEEKDAYS_TRANSLATION } from '@admin/_lib/consts';
import { isSpecifiedWorkTime } from '@admin/_utils/common';
import { MESSAGES, zString, zUrl } from './common';

// ------------------ COMMON SECTION ---------------------

export const zStringWithMax = zString.max(128, {
  message: 'Поле не повинно перевищувати 128 символів',
});

export const zStringArray = zString.array().min(1, {
  message: MESSAGES.requiredField,
});

export const zInteger = z
  .number({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.unacceptableValue,
  })
  .nonnegative({
    message: 'Число має бути не менше 0',
  })
  .nullish();

export const zWorkTimeSchema = z
  .array(
    z
      .object({
        weekDay: z.enum(Object.values(WEEKDAYS_TRANSLATION)),
        time: z
          .string()
          .refine(val => !val || /\d{2}:\d{2}\s-\s\d{2}:\d{2}/.test(val), {
            message: 'Введіть час у форматі ХХ:ХХ - ХХ:ХХ',
          })
          .nullish(),
        isDayOff: z.boolean().nullish(),
      })
      .superRefine((data, ctx) => {
        const { time, isDayOff } = data;
        if (time && isDayOff) {
          ctx.addIssue({
            code: 'custom',
            message: 'Приберіть час роботи, якщо це вихідний',
            path: ['time'],
          });
        }
      }),
  )
  .superRefine((workTime, ctx) => {
    if (!isSpecifiedWorkTime(workTime)) return;
    workTime.forEach((day, index) => {
      if (!day.isDayOff && !day.time) {
        ctx.addIssue({
          code: 'custom',
          message: 'Додайте час роботи, якщо це не вихідний',
          path: [index, 'time'],
        });
        ctx.addIssue({
          code: 'custom',
          message: `Додайте час роботи або вихідний для кожного дня
            (чи приберіть усі дані якщо графік роботи не зазначено)`,
        });
      }
    });
  });

export const serviceProviderCore = z.object({
  isActive: z.boolean().optional(),
  formatOfWork: zString.refine(val => Object.values(FormatOfWork).includes(val), {
    message: MESSAGES.unacceptableValue,
  }),
  isFreeReception: z.boolean(),

  phone: zString
    .refine(val => PHONE_REGEX.test(val), {
      message: 'Введіть номер телефону у міжнародному форматі',
    })
    .nullish(),

  phone: z
    .string()
    .max(15, { message: 'Номер не повинен перевищувати 15 символів' })
    .optional()
    .or(z.literal('').transform(() => undefined)),

  email: zString.email().nullish(),
  addressesIds: zString.array().nullish(),
  website: zString.url({ message: MESSAGES.unacceptableValue }).nullish(),
  workTime: zWorkTimeSchema,
  socialLink: z
    .object({
      instagram: zUrl.nullish(),
      facebook: zUrl.nullish(),
      youtube: zUrl.nullish(),
      linkedin: zUrl.nullish(),
      tiktok: zUrl.nullish(),
      viber: zUrl.nullish(),
      telegram: zUrl.nullish(),
    })
    .refine(
      links => {
        const numLinks = Object.values(links).filter(link => link)?.length;
        return numLinks <= MAX_NUM_SELECTED_SOCIAL_LINKS;
      },
      {
        message: `Максимальна кількість вказаних соціальних мереж 
        не повинна перевищувати ${MAX_NUM_SELECTED_SOCIAL_LINKS}`,
      },
    ),
  clients: z
    .object({
      workingWith: z.string().array().default([]),
      notWorkingWith: z.string().array().default([]),
    })
    .refine(
      clients => {
        const hasDuplicates = clients.workingWith.some(item => clients.notWorkingWith.includes(item));
        return !hasDuplicates;
      },
      { message: 'Категорія клієнта може бути вибрана лише один раз. Перевірте, чи не дублюються поля.' },
    ),
});

const zCoordinateSchema = z.object({
  latitude: z
    .number({ required_error: MESSAGES.requiredField, invalid_type_error: MESSAGES.unacceptableValue })
    .min(-180, { message: 'Мінімальне допустиме значення -180' })
    .max(180, { message: 'Максимальне допустиме значення 180' }),
  longitude: z
    .number({ required_error: MESSAGES.requiredField, invalid_type_error: MESSAGES.unacceptableValue })
    .min(-90, { message: 'Мінімальне допустиме значення -90' })
    .max(90, { message: 'Максимальне допустиме значення 90' }),
});

export const zEditAddressSchema = z.object({
  id: z.string().nullish(),
  fullAddress: zStringWithMax,
  nameOfClinic: z.string().nullish(),
  districtId: zString,
  district: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullish(),
  isPrimary: z
    .boolean()
    .nullish()
    .transform(arg => (arg === null ? false : arg)),
  ...zCoordinateSchema.shape,
});

export const zCreateAddressSchema = z.object({
  fullAddress: zStringWithMax,
  district: zStringWithMax,
  nameOfClinic: zStringWithMax.nullish(),
  isPrimary: z.boolean(),
  ...zCoordinateSchema.shape,
});

export const singlePrimaryAddressRefine = addresses => {
  if (!addresses.length) return true;
  return addresses.filter(el => el.isPrimary).length === 1;
};

// ---- SUPPORT FOCUS SECTION ----

export const zSupportFocusSchema = z.object({
  id: zString.nullish(),
  price: zInteger.nullish(),
  therapy: z.object({
    id: zString,
    title: zString,
  }),
  requestsIds: zString.array().min(1, {
    message: 'Необхідно обрати хоча б один запит',
  }),
});

export const createValidationSchema = (schemaUnion, defaultProperties) =>
  z.intersection(schemaUnion, defaultProperties).superRefine((schema, ctx) => {
    const { formatOfWork, isActive, addresses } = schema;

    if (isActive && formatOfWork !== FormatOfWork.ONLINE && !addresses.length) {
      ctx.addIssue({
        code: 'custom',
        message: 'Необхідно вказати мінімум одне місце надання послуг',
        path: ['addresses'],
      });
    }

    if (formatOfWork === FormatOfWork.ONLINE) {
      return {
        ...schema,
        addresses: [],
      };
    }

    return schema;
  });
