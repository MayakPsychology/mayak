import { z } from 'zod';
import { FormatOfWork, Gender } from '@prisma/client';
import { WEEKDAYS_TRANSLATION } from '@/app/(admin)/admin/_lib/consts';
import { string, number, boolean, array, regexField } from '@/lib/validationSchemas/utils';
import { MESSENGER_REGEX, PHONE_REGEX, SOCIAL_REGEX } from '@/lib/consts';

export const zCreateAddressSchema = z.object({
  fullAddress: string('Адреса').min(2).max(128).zod,
  district: string('Район').min(2).max(128).zod,
  nameOfClinic: string('Назва клініки').min(2).max(128).emptyToNull().zod,
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

export const zSosialLinkSchema = z.object({
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
  })
  .superRefine((clients, ctx) => {
    const hasDuplicates = clients.workingWith.some(item => clients.notWorkingWith.includes(item));

    if (hasDuplicates) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Категорія клієнта може бути вибрана лише один раз. Перевірте, чи не дублюються поля.',
        path: ['root'],
      });
    }
  });

export const specialistApplicationSchema = z.object({
  firstName: string("Ім'я").min(2).max(128).zod,
  lastName: string('Прізвище').min(2).max(128).zod,
  surname: string('По-батькові').min(2).max(128).zod,
  yearsOfExperience: number('Стаж роботи').min(0.5).halfStep().zod,
  gender: z.enum(Object.values(Gender), {
    required_error: 'Оберіть стать',
    invalid_type_error: 'Оберіть стать',
  }),
  formatOfWork: z.enum(Object.values(FormatOfWork), {
    required_error: 'Оберіть формат роботи',
    invalid_type_error: 'Оберіть формат роботи',
  }),
  addresses: array('Адреси', zCreateAddressSchema).zod,
  workTime: array('Адреси', zWorkDaySchema).zod,
  email: string('Пошта').email().emptyToNull().zod,
  website: string('Веб сторінка').url().emptyToNull().zod,
  phone: regexField('Телефон', PHONE_REGEX, 'Введіть номер телефону у міжнародному форматі'),
  socialLink: zSosialLinkSchema,
  description: string('Опис').min(10).max(5000).zod,
  clients: zClientsSchema,
  // specializations: array('Спеціалізації', string('Спеціалізація').min(2).max(128)).zod,
  // specializationMethods: array('Методи спеціалізації', string('Метод спеціалізації').min(2).max(128)).zod,
});
