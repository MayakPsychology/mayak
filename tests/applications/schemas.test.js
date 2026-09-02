import { describe, expect, it } from 'vitest';
import { specialistApplicationFullSchema } from '@/lib/validationSchemas/applications/specialistApplicationSchema';
import { organizationApplicationFullSchema } from '@/lib/validationSchemas/applications/organizationApplicationSchema';
import { eventApplicationSchema } from '@/lib/validationSchemas/applications/eventApplicationSchema';
import { eventApplication, organizationApplication, specialistApplication, supportFocuses } from './fixtures';

const ACCEPTS_COMPLETE = 'accepts a complete application';

describe('specialist application schema', () => {
  it(ACCEPTS_COMPLETE, () => {
    expect(specialistApplicationFullSchema.safeParse(specialistApplication).success).toBe(true);
  });

  it('requires an address for offline work', () => {
    const result = specialistApplicationFullSchema.safeParse({ ...specialistApplication, addresses: [] });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(issue => issue.path[0] === 'addresses')).toBe(true);
  });

  it('allows online work without an address', () => {
    const online = { ...specialistApplication, formatOfWork: 'ONLINE', addresses: [] };
    expect(specialistApplicationFullSchema.safeParse(online).success).toBe(true);
  });

  it('requires at least one client category', () => {
    const noClients = { ...specialistApplication, clients: { workingWith: [], notWorkingWith: [] } };
    expect(specialistApplicationFullSchema.safeParse(noClients).success).toBe(false);
  });

  it('requires at least one type of support', () => {
    expect(specialistApplicationFullSchema.safeParse({ ...specialistApplication, supportFocuses: [] }).success).toBe(
      false,
    );
  });

  it('treats a cleared optional price as absent rather than zero', () => {
    const cleared = { ...specialistApplication, supportFocuses: [{ ...supportFocuses[0], price: '' }] };
    const result = specialistApplicationFullSchema.safeParse(cleared);
    expect(result.success).toBe(true);
    expect(result.data.supportFocuses[0].price).toBeUndefined();
  });

  it('rejects a cleared years of experience', () => {
    expect(
      specialistApplicationFullSchema.safeParse({ ...specialistApplication, yearsOfExperience: '' }).success,
    ).toBe(false);
  });
});

describe('organization application schema', () => {
  it(ACCEPTS_COMPLETE, () => {
    expect(organizationApplicationFullSchema.safeParse(organizationApplication).success).toBe(true);
  });

  it('requires at least one organization type', () => {
    expect(organizationApplicationFullSchema.safeParse({ ...organizationApplication, type: [] }).success).toBe(false);
  });

  it('requires at least one expert specialization', () => {
    const noSpecs = { ...organizationApplication, expertSpecializations: [] };
    expect(organizationApplicationFullSchema.safeParse(noSpecs).success).toBe(false);
  });

  it('allows online work without an address', () => {
    const online = { ...organizationApplication, formatOfWork: 'ONLINE', addresses: [] };
    expect(organizationApplicationFullSchema.safeParse(online).success).toBe(true);
  });

  it('rejects a cleared years on market', () => {
    expect(organizationApplicationFullSchema.safeParse({ ...organizationApplication, yearsOnMarket: '' }).success).toBe(
      false,
    );
  });
});

describe('event application schema', () => {
  it(ACCEPTS_COMPLETE, () => {
    expect(eventApplicationSchema.safeParse(eventApplication).success).toBe(true);
  });

  it('requires a venue for offline events', () => {
    expect(eventApplicationSchema.safeParse({ ...eventApplication, address: '' }).success).toBe(false);
  });

  it('requires a venue for hybrid events', () => {
    const hybrid = { ...eventApplication, format: 'ONLINE_OFFLINE', address: '' };
    expect(eventApplicationSchema.safeParse(hybrid).success).toBe(false);
  });

  it('accepts a hybrid event with a venue', () => {
    const hybrid = { ...eventApplication, format: 'ONLINE_OFFLINE' };
    expect(eventApplicationSchema.safeParse(hybrid).success).toBe(true);
  });

  it('allows online events without a venue', () => {
    const online = { ...eventApplication, format: 'ONLINE', address: '' };
    expect(eventApplicationSchema.safeParse(online).success).toBe(true);
  });

  it.each([
    ['missing', null],
    ['cleared', ''],
    ['zero', 0],
  ])('rejects a paid event with a %s price', (_label, price) => {
    expect(eventApplicationSchema.safeParse({ ...eventApplication, price }).success).toBe(false);
  });

  it('allows a free event without a price', () => {
    const free = { ...eventApplication, priceType: 'FREE', price: null };
    expect(eventApplicationSchema.safeParse(free).success).toBe(true);
  });

  it('rejects a free event that carries a price', () => {
    const free = { ...eventApplication, priceType: 'FREE', price: 300 };
    expect(eventApplicationSchema.safeParse(free).success).toBe(false);
  });

  it('rejects an event dated in the past', () => {
    expect(eventApplicationSchema.safeParse({ ...eventApplication, eventDate: '2020-01-01T10:00' }).success).toBe(false);
  });

  it('rejects a malformed link', () => {
    expect(eventApplicationSchema.safeParse({ ...eventApplication, link: 'not-a-url' }).success).toBe(false);
  });
});
