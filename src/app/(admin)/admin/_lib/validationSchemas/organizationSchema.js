import { z } from 'zod';
import {
  createValidationSchema,
  singlePrimaryAddressRefine,
  serviceProviderCore,
  zCreateAddressSchema,
  zEditAddressSchema,
  zSupportFocusSchema,
  zInteger,
  zStringArray,
  zStringWithMax,
} from './serviceProviderCommonSchemas';
import { MESSAGES, zString } from './common';

// ------------------ COMMON SECTION ---------------------

const zOrganizationSchema = serviceProviderCore.extend({
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
  ownershipType: z.enum(['PRIVATE', 'GOVERNMENT']),
  isInclusiveSpace: z.boolean(),
  expertSpecializations: zStringArray,
  supportFocuses: zSupportFocusSchema.array().min(1, {
    message: 'Необхідно обрати хоча б один тип терапії',
  }),
  type: zStringArray.default([]),
  description: zString,
  isActive: z.literal(true),
});

const draftOrganizationSchema = restCreateProps.partial().extend({
  supportFocuses: zSupportFocusSchema.array().nullish(),
  type: zStringArray.nullish().default([]),
  addresses: zCreateAddressSchema.array().nullish(),
  ownershipType: z.enum(['PRIVATE', 'GOVERNMENT']).nullish(),
  isInclusiveSpace: z.boolean(),
  expertSpecializations: zStringArray.nullish(),
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
  supportFocuses: zSupportFocusSchema.array().min(1, {
    message: 'Необхідно обрати хоча б один тип терапії',
  }),
  organizationTypesIds: zStringArray.default([]),
  expertSpecializationIds: zStringArray.default([]),
  ownershipType: z.enum(['PRIVATE', 'GOVERNMENT']),
  isInclusiveSpace: z.boolean(),
  description: zString,
  isActive: z.literal(true),
  clientsWorkingWithIds: z.string().array().default([]),
  clientsNotWorkingWithIds: z.string().array().default([]),
});

const draftOrganizationEditSchema = restEditProps.partial().extend({
  supportFocuses: zSupportFocusSchema.array().nullish(),
  organizationTypesIds: zStringArray.nullish(),
  formatOfWork: zString.nullish(),
  isActive: z.literal(false),
  expertSpecializationIds: zStringArray.nullish(),
  ownershipType: z.enum(['PRIVATE', 'GOVERNMENT']).nullish(),
  isInclusiveSpace: z.boolean(),
});

const organizationSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeOrganizationEditSchema,
  draftOrganizationEditSchema,
]);

export const organizationEditValidationSchema = createValidationSchema(organizationSchemaEditUnion, editDefaultProps);
