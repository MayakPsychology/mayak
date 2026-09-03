import { z } from 'zod';
import { string, date, errors } from '@/lib/validationSchemas/utils';

const ActiveEventSchema = z.object({
  isActive: z.literal(true),
  title: string('Назва події').min(1).max(128).zod,
  organizerName: string('Організатор').min(1).max(128).zod,
  eventDate: date('Дата події').min(new Date()).zod,
  notes: string('Коментарі').min(1).max(350).nullish().zod,
  locationLink: string('Посилання').nullish().zod,
  additionalLink: z
    .object({
      label: string('Тип').min(1).max(30).nullish().zod,
      link: string('Посилання').min(1).nullish().zod,
    })
    .superRefine((data, ctx) => {
      const { label, link } = data;
      if (label && !link) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          path: ['link'],
          message: errors('Посилання').required,
        });
      }
      if (link && !label) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          path: ['label'],
          message: errors('Тип').required,
        });
      }
    }),
  format: z.enum(['ONLINE', 'OFFLINE', 'ONLINE_OFFLINE'], {
    required_error: errors('Формат').required,
    invalid_type_error: errors('Формат').format('OFFLINE/ONLINE/ONLINE_OFFLINE'),
  }),
  priceType: z.enum(['FREE', 'FIXED_PRICE', 'MIN_PRICE'], {
    required_error: errors('Варіант вартості').required,
    invalid_type_error: errors('Варіант вартості').format('FREE/FIXED_PRICE/MIN_PRICE'),
  }),
  price: z.number().nullish(),
  address: string('Адреса').min(1).max(128).nullish().zod,
});

const DraftEventSchema = z.object({
  isActive: z.literal(false),
  title: string('Назва події').min(1).max(128).zod,
  organizerName: string('Організатор').min(1).max(128).zod,
});

export const EventSchema = z
  .discriminatedUnion('isActive', [ActiveEventSchema, DraftEventSchema])
  .superRefine((data, ctx) => {
    const { price, format, address, priceType } = data;
    if (format === 'ONLINE' && address) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['address'],
        message: 'Онлайн подія не повинна мати адресу',
      });
    }
    if (format !== 'ONLINE' && format && !address) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['address'],
        message: 'Адреса чи назва приміщення необхідні для офлайн події',
      });
    }
    if (priceType === 'FREE' && price) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['price'],
        message: 'Безкоштовна подія не може мати ціну',
      });
    }
    if (priceType && priceType !== 'FREE' && (!price || price <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['price'],
        message: "Невід'ємна ціна необхідна для небезкоштовної події",
      });
    }
  });
