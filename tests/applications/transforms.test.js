import { describe, expect, it } from 'vitest';
import { transformSpecialistData } from '@/app/(admin)/admin/_utils/transformSpecialistData';
import { transformOrganizationData } from '@/app/(admin)/admin/_utils/transformOrganizationData';
import { transformEventCreateData } from '@/app/(admin)/admin/_utils/transformEventCreateData';
import { normalizeForPrisma } from '@/app/_utils/normalizeForPrisma';
import { UUID, addresses, supportFocuses, workTime } from './fixtures';

const CREATED_INACTIVE = 'is always created inactive';
const TEST_ADDRESS = 'вул. Тестова 1';

const shared = {
  formatOfWork: 'OFFLINE',
  phone: '+380671112233',
  email: undefined,
  website: undefined,
  description: 'Опис',
  isFreeReception: false,
  addresses: addresses.map(address => ({ ...address, nameOfClinic: undefined })),
  workTime,
  supportFocuses: supportFocuses.map(({ requestsNames, ...focus }) => focus),
  clients: { workingWith: [UUID], notWorkingWith: [] },
  instagram: undefined,
  isActive: false,
};

const buildSpecialist = () =>
  transformSpecialistData(
    normalizeForPrisma({
      ...shared,
      firstName: 'Іван',
      lastName: 'Петренко',
      surname: undefined,
      gender: 'MALE',
      yearsOfExperience: 5,
      specializations: [UUID],
      specializationMethods: [UUID],
    }),
  );

const buildOrganization = () =>
  transformOrganizationData(
    normalizeForPrisma({
      ...shared,
      name: 'Центр Маяк',
      type: [UUID],
      ownershipType: 'PRIVATE',
      yearsOnMarket: 7,
      yearsOfExperience: 4,
      isInclusiveSpace: true,
      expertSpecializations: [UUID],
    }),
  );

describe('specialist prisma payload', () => {
  const data = buildSpecialist();

  it(CREATED_INACTIVE, () => {
    expect(data.isActive).toBe(false);
  });

  it('connects specializations and methods', () => {
    expect(data.specializations.connect[0].id).toBe(UUID);
    expect(data.specializationMethods.connect[0].id).toBe(UUID);
  });

  it('connects the address district', () => {
    expect(data.addresses.create[0].district.connect.id).toBe(UUID);
  });

  it('creates support focuses with their therapy and requests', () => {
    expect(data.supportFocuses.create[0].therapy.connect.id).toBe(UUID);
    expect(data.supportFocuses.create[0].requests.connect[0].id).toBe(UUID);
  });

  it('connects client categories', () => {
    expect(data.clientsWorkingWith.connect[0].id).toBe(UUID);
  });

  it('connects work time', () => {
    expect(data.workTime.connectOrCreate).toHaveLength(7);
  });

  it('does not leak raw form-only keys', () => {
    expect(data.clients).toBeUndefined();
    expect(data.socialLink).toBeUndefined();
  });
});

describe('organization prisma payload', () => {
  const data = buildOrganization();

  it(CREATED_INACTIVE, () => {
    expect(data.isActive).toBe(false);
  });

  it('connects organization types and expert specializations', () => {
    expect(data.type.connect[0].id).toBe(UUID);
    expect(data.expertSpecializations.connect[0].id).toBe(UUID);
  });

  it('keeps both experience fields', () => {
    expect(data.yearsOnMarket).toBe(7);
    expect(data.yearsOfExperience).toBe(4);
  });
});

describe('event prisma payload', () => {
  const build = overrides =>
    transformEventCreateData({
      title: 'Вебінар',
      organizerName: 'Маяк',
      eventDate: new Date('2099-10-01T18:00:00Z'),
      format: 'OFFLINE',
      priceType: 'FIXED_PRICE',
      price: 300,
      address: TEST_ADDRESS,
      locationLink: null,
      notes: 'Опис події',
      additionalLink: { label: 'Посилання на подію', link: 'https://example.com/event' },
      isActive: false,
      ...overrides,
    });

  it(CREATED_INACTIVE, () => {
    expect(build().isActive).toBe(false);
  });

  it('keeps the venue for offline and hybrid events', () => {
    expect(build().address).toBe(TEST_ADDRESS);
    expect(build({ format: 'ONLINE_OFFLINE' }).address).toBe(TEST_ADDRESS);
  });

  it('drops the venue for online events', () => {
    expect(build({ format: 'ONLINE' }).address).toBeNull();
  });

  it('drops the price for free events', () => {
    expect(build({ priceType: 'FREE' }).price).toBeNull();
  });

  it('connects or creates the additional link', () => {
    expect(build().additionalLink.connectOrCreate.create.link).toBe('https://example.com/event');
  });
});
