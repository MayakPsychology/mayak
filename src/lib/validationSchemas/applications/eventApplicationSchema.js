import { z } from 'zod';
import { EventFormat, EventPriceFormat } from '@prisma/client';
import { string, number } from '@/lib/validationSchemas/utils';

export const eventApplicationSchema = z
  .object({
    title: string('Назва події').min(2).max(128).zod,
    organizerName: string('Організатор події').min(2).max(128).zod,
    eventDate: z.coerce
      .date({
        required_error: 'Оберіть дату події',
        invalid_type_error: 'Невірний формат дати',
      })
      .refine(value => value.getTime() > Date.now(), { message: 'Дата події не може бути в минулому' }),
    priceType: z.enum(Object.values(EventPriceFormat), {
      required_error: 'Оберіть вартість події',
      invalid_type_error: 'Оберіть вартість події',
    }),
    price: number('Вартість').min(0).integer().nullish().zod,
    format: z.enum(Object.values(EventFormat), {
      required_error: 'Оберіть формат події',
      invalid_type_error: 'Оберіть формат події',
    }),
    address: string('Місце проведення').min(2).max(128).optional().zod,
    notes: string('Опис події').min(10).max(350).zod,
    link: string('Посилання').url().zod,
  })
  .superRefine((data, ctx) => {
    if (data.format !== EventFormat.ONLINE && !data.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Місце проведення необхідне для офлайн події',
        path: ['address'],
      });
    }

    if (data.priceType !== EventPriceFormat.FREE && !(data.price > 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Вкажіть вартість події',
        path: ['price'],
      });
    }

    if (data.priceType === EventPriceFormat.FREE && data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Безкоштовна подія не може мати вартість',
        path: ['price'],
      });
    }
  });
