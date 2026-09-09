import { z } from 'zod';
import { EventFormat, EventPriceFormat } from '@prisma/client';
import { string, number } from '@/lib/validationSchemas/utils';
import { zFilesField, zSubmitterContactShape } from './common';

const eventShape = z.object({
  title: string('Назва події').min(2).max(128).zod,
  organizerName: string('Організатор події').min(2).max(128).zod,
  // an untouched datetime input sends '' or a bare 'T', which would coerce to an "Invalid date"
  eventDate: z.preprocess(
    value => {
      if (value === '' || value == null || String(value).startsWith('T') || String(value).endsWith('T')) {
        return undefined;
      }
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? undefined : parsed;
    },
    z
      .date({
        required_error: "Дата події є обов'язковою",
        invalid_type_error: "Дата події є обов'язковою",
      })
      .refine(value => value.getTime() > Date.now(), { message: 'Дата події не може бути в минулому' }),
  ),
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
  eventFiles: zFilesField,
});

const refineEvent = (data, ctx) => {
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
};

export const eventApplicationStepSchema = eventShape.superRefine(refineEvent);

export const eventSubmitterContactSchema = z.object(zSubmitterContactShape);

export const eventApplicationSchema = eventShape.merge(eventSubmitterContactSchema).superRefine(refineEvent);
