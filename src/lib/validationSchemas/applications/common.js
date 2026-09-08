import { z } from 'zod';
import { WEEKDAYS_TRANSLATION } from '@/app/(admin)/admin/_lib/consts';
import { isOrderedRange } from '@/app/_components/applications/_shared/fields/timeRange';
import { string, number, boolean, array, regexField } from '@/lib/validationSchemas/utils';
import { MESSENGER_REGEX, PHONE_REGEX, SOCIAL_REGEX } from '@/lib/consts';

export const zCreateAddressSchema = z.object({
  fullAddress: string('Адреса').min(2).max(128).zod,
  city: string('Місто').zod,
  // optional: most Ukrainian towns are not split into districts
  district: string('Район').optional().zod,
  nameOfClinic: string('Назва клініки').min(2).max(128).optional().zod,
  isPrimary: boolean('Основна').zod,
});

export const zWorkDaySchema = z
  .object({
    weekDay: z.enum(Object.values(WEEKDAYS_TRANSLATION)),
    time: z
      .string()
      .refine(val => !val || /\d{2}:\d{2}\s-\s\d{2}:\d{2}/.test(val), {
        message: 'Введіть час у форматі ХХ:ХХ - ХХ:ХХ',
      })
      .refine(val => !val || isOrderedRange(val), {
        message: 'Час завершення має бути пізніше за час початку',
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
  });

export const zSocialLinkSchema = z.object({
  instagram: regexField('Instagram', SOCIAL_REGEX.INSTAGRAM, 'instagram.com/username'),
  facebook: regexField('Facebook', SOCIAL_REGEX.FACEBOOK, 'facebook.com/username'),
  linkedin: regexField('LinkedIn', SOCIAL_REGEX.LINKEDIN, 'linkedin.com/in/username'),
  youtube: regexField('YouTube', SOCIAL_REGEX.YOUTUBE, 'youtube.com/@username'),
  tiktok: regexField('TikTok', SOCIAL_REGEX.TIKTOK, 'tiktok.com/@username'),
  telegram: regexField('Telegram', MESSENGER_REGEX.TELEGRAM, 'telegram.me/username'),
  viber: regexField('Viber', MESSENGER_REGEX.VIBER, 'Невірний формат посилання'),
});

export const zClientsSchema = z
  .object({
    workingWith: z.string().array().default([]),
    notWorkingWith: z.string().array().default([]),
    workingWithOther: z.string().nullish(),
    notWorkingWithOther: z.string().nullish(),
    workingWithNames: z.string().array().optional(),
    notWorkingWithNames: z.string().array().optional(),
  })
  .superRefine((clients, ctx) => {
    if (!clients.workingWith.length && !clients.workingWithOther) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Оберіть хоча б одну категорію клієнтів',
        path: ['workingWith'],
      });
    }

    if (!clients.notWorkingWith.length && !clients.notWorkingWithOther) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Оберіть хоча б одну категорію клієнтів',
        path: ['notWorkingWith'],
      });
    }

    const hasDuplicates = clients.workingWith.some(item => clients.notWorkingWith.includes(item));

    if (hasDuplicates) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Категорія клієнта може бути вибрана лише один раз. Перевірте, чи не дублюються поля.',
        path: ['root'],
      });
    }
  });

export const zSupportFocusSchema = z.object({
  id: string().optional().zod,
  price: number('Ціна').min(0).nullish().optional().zod,
  therapy: z.object({
    id: string('Терапія').zod,
    title: z.string().optional(),
  }),
  requestsIds: array('Запити', string().zod, { min: 1, message: 'Необхідно обрати хоча б один запит' }).zod,
  requestsNames: array('Назви запитів', string().zod, { min: 1, message: 'Необхідно обрати хоча б один запит' }).zod,
});

export const zContactsShape = {
  email: string('Пошта').email().optional().zod,
  website: string('Веб сторінка').url().optional().zod,
  phone: regexField('Телефон', PHONE_REGEX, 'Введіть номер телефону у міжнародному форматі'),
};

export const zSupportFocusesField = array('Напрямки підтримки', zSupportFocusSchema, {
  min: 1,
  message: 'Необхідно обрати хоча б один тип терапії',
}).zod;

// "Чи надаються у Вас знижки…" — "ні" or "інше:" with the details typed in.
export const zDiscountsShape = {
  discounts: z.enum(['no', 'other'], {
    required_error: 'Оберіть відповідь',
    invalid_type_error: 'Оберіть відповідь',
  }),
  discountsOther: string('Знижки').max(500).optional().zod,
};

export const refineDiscounts = (data, ctx) => {
  if (data.discounts === 'other' && !data.discountsOther) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Опишіть, які саме знижки Ви надаєте',
      path: ['discountsOther'],
    });
  }
};

// Closing slide: who filled the form in. Never published, kept for follow-up questions.
export const zSubmitterContactShape = {
  submitterContact: string('Контактні дані особи, яка заповнює форму').min(5).max(500).zod,
};
