import z from 'zod';
import { FormatOfWork, Gender } from '@prisma/client';
import { string, number } from '@/lib/validationSchemas/utils';

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
});
