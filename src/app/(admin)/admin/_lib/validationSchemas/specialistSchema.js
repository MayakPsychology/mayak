import { z } from 'zod';
import { Gender } from '@prisma/client';
import {
  createValidationSchema,
  singlePrimaryAddressRefine,
  serviceProviderCore,
  zCreateAddressSchema,
  zEditAddressSchema,
  zSupportFocusSchema,
  zStringArray,
  zStringWithMax,
  zYearsNumber,
} from './serviceProviderCommonSchemas';
import { MESSAGES, zString } from './common';

// ------------------ COMMON SECTION ---------------------

const zSpecialistSchema = serviceProviderCore.extend({
  surname: zStringWithMax.nullish(),
  gender: zString.refine(val => Object.values(Gender).includes(val), {
    message: MESSAGES.unacceptableValue,
    invalid_type_error: 'Неприпустиме значення',
  }),
  yearsOfExperience: zYearsNumber,
  description: zString,
});

// ------------------ CREATE SECTION ---------------------

const restCreateProps = zSpecialistSchema.extend({
  addresses: zCreateAddressSchema
    .array()
    .default([])
    .refine(singlePrimaryAddressRefine, { message: MESSAGES.singlePrimaryAddress }),
});

const createDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
});

const activeSpecialistSchema = restCreateProps.extend({
  supportFocuses: zSupportFocusSchema.array().min(1, {
    message: 'Необхідно обрати хоча б один тип терапії',
  }),
  specializations: zStringArray.nullish().default([]),
  specializationMethods: zString.array().default([]).nullish(),
  isActive: z.literal(true),
});

const draftSpecialistSchema = restCreateProps.partial().extend({
  supportFocuses: zSupportFocusSchema.array().nullish(),
  addresses: zCreateAddressSchema.array().nullish(),
  specializations: zStringArray.nullish(),
  specializationMethods: zString.array().default([]).nullish(),
  isActive: z.literal(false),
});

export const specialistSchemaUnion = z.discriminatedUnion('isActive', [activeSpecialistSchema, draftSpecialistSchema]);
export const specialistCreateValidationSchema = createValidationSchema(specialistSchemaUnion, createDefaultProps);

// ------------------ EDIT SECTION ---------------------

const restEditProps = zSpecialistSchema.extend({
  addresses: zEditAddressSchema
    .array()
    .default([])
    .refine(singlePrimaryAddressRefine, { message: MESSAGES.singlePrimaryAddress }),
  supportFocusesIds: z.string().array().nullish(),
});

const editDefaultProps = z.object({
  lastName: zStringWithMax,
  firstName: zStringWithMax,
});

const activeSpecialistEditSchema = restEditProps.extend({
  supportFocuses: zSupportFocusSchema.array().min(1, {
    message: 'Необхідно обрати хоча б один тип терапії',
  }),
  specializationsIds: zStringArray.nullish().default([]),
  specializationMethodsIds: z
    .object({
      psychologist: z.string().array().nullish().default([]),
      psychotherapist: z.string().array().nullish().default([]),
    })
    .nullish(),
  isActive: z.literal(true),
});

const draftSpecialistEditSchema = restEditProps.partial().extend({
  supportFocuses: zSupportFocusSchema.array().nullish(),
  addresses: zEditAddressSchema.array().nullish(),
  specializationsIds: zStringArray.nullish(),
  specializationMethodsIds: z
    .object({
      psychologist: z.string().array().nullish(),
      psychotherapist: z.string().array().nullish(),
    })
    .nullish(),
  isActive: z.literal(false),
});

const specialistSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeSpecialistEditSchema,
  draftSpecialistEditSchema,
]);

export const specialistEditValidationSchema = createValidationSchema(specialistSchemaEditUnion, editDefaultProps);
