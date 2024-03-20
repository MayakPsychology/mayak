import { z } from 'zod';
import {
  MESSAGES,
  createValidationSchema,
  singlePrimaryAddressRefine,
  specialistCore,
  zCreateAddressSchema,
  zEditAddressSchema,
  zEditTherapyCutSchema,
  zInteger,
  zString,
  zStringArray,
  zStringWithMax,
} from './specialistCommonSchemas';

// ------------------ COMMON SECTION ---------------------

const zOrganizationSchema = specialistCore.extend({
  yearsOnMarket: zInteger,
});

// ------------------ CREATE SECTION ---------------------

const restCreateProps = zOrganizationSchema.extend({
  addresses: zCreateAddressSchema
    .array()
    .default([])
    .refine(singlePrimaryAddressRefine, { message: MESSAGES.singlePrimaryAddress }),
});

const createDefaultProps = z.object({
  name: zStringWithMax,
});

const activeOrganizationSchema = restCreateProps.extend({
  supportFocuses: zEditTherapyCutSchema.array().min(1, {
    message: 'Необхідно обрати хоча б один тип терапії',
  }),
  type: zStringArray.default([]),
  description: zString,
  isActive: z.literal(true),
});

const draftOrganizationSchema = restCreateProps.partial().extend({
  supportFocuses: zEditTherapyCutSchema.array().nullish(),
  type: zStringArray.nullish().default([]),
  addresses: zCreateAddressSchema.array().nullish(),
  isActive: z.literal(false),
});

export const organizationSchemaUnion = z.discriminatedUnion('isActive', [
  activeOrganizationSchema,
  draftOrganizationSchema,
]);
export const organizationCreateValidationSchema = createValidationSchema(organizationSchemaUnion, createDefaultProps);

// ------------------ EDIT SECTION ---------------------

const restEditProps = zOrganizationSchema.extend({
  addresses: zEditAddressSchema
    .array()
    .default([])
    .refine(singlePrimaryAddressRefine, { message: MESSAGES.singlePrimaryAddress }),
  supportFocusesIds: z.string().array().nullish(),
});

const editDefaultProps = z.object({
  name: zStringWithMax,
});

const activeOrganizationEditSchema = restEditProps.extend({
  supportFocuses: zEditTherapyCutSchema.array().min(1, {
    message: 'Необхідно обрати хоча б один тип терапії',
  }),
  organizationTypesIds: zStringArray.default([]),
  description: zString,
  isActive: z.literal(true),
});

const draftOrganizationEditSchema = restEditProps.partial().extend({
  supportFocuses: zEditTherapyCutSchema.array().nullish(),
  organizationTypesIds: zStringArray.nullish(),
  formatOfWork: zString.nullish(),
  isActive: z.literal(false),
});

const organizationSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeOrganizationEditSchema,
  draftOrganizationEditSchema,
]);

export const organizationEditValidationSchema = createValidationSchema(organizationSchemaEditUnion, editDefaultProps);
