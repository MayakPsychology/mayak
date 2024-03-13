import { z } from 'zod';
import {
  createValidationSchema,
  specialistCore,
  zCreateAddressSchema,
  zEditAddressSchema,
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
  addresses: zCreateAddressSchema.array().default([]),
});

const createDefaultProps = z.object({
  name: zStringWithMax,
});

const activeOrganizationSchema = restCreateProps.extend({
  therapies: zStringArray,
  type: zStringArray.default([]),
  description: zString,
  isActive: z.literal(true),
});

const draftOrganizationSchema = restCreateProps.partial().extend({
  isActive: z.literal(false),
});

export const organizationSchemaUnion = z.discriminatedUnion('isActive', [
  activeOrganizationSchema,
  draftOrganizationSchema,
]);
export const organizationCreateValidationSchema = createValidationSchema(organizationSchemaUnion, createDefaultProps);

// ------------------ EDIT SECTION ---------------------

const restEditProps = zOrganizationSchema.extend({
  addresses: zEditAddressSchema.array().default([]),
});

const editDefaultProps = z.object({
  name: zStringWithMax,
});

const activeOrganizationEditSchema = restEditProps.extend({
  therapiesIds: zStringArray,
  organizationTypesIds: zStringArray.default([]),
  description: zString,
  isActive: z.literal(true),
});

const draftOrganizationEditSchema = restEditProps.partial().extend({
  isActive: z.literal(false),
});

const organizationSchemaEditUnion = z.discriminatedUnion('isActive', [
  activeOrganizationEditSchema,
  draftOrganizationEditSchema,
]);

export const organizationEditValidationSchema = createValidationSchema(organizationSchemaEditUnion, editDefaultProps);
