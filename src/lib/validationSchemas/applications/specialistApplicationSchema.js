import { z } from 'zod';
import { FormatOfWork, Gender } from '@prisma/client';
import { WEEKDAYS_TRANSLATION } from '@/app/(admin)/admin/_lib/consts';
import { string, number, boolean, array } from '@/lib/validationSchemas/utils';

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

export const specialistApplicationSchema = z.object({
  firstName: string("Ім'я").min(2).max(128).zod,
  lastName: string('Прізвище').min(2).max(128).zod,
  surname: string('По-батькові').min(2).max(128).zod,
  yearsOfExperience: number('Стаж роботи').min(1).max(30).halfStep().zod,
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
});
