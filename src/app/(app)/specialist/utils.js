import { prisma } from '@/lib/db';
import { organizationSelect, specialistSelect } from '@/app/(app)/specialist/consts';

export const getSpecialistById = async ({ id }) =>
  prisma.specialist.findUnique({
    where: {
      id,
    },
    select: specialistSelect,
  });

export const getSpecialists = async ({ model, orderByCondition, select }) =>
  await prisma[model].findMany({
    where: {
      isActive: true,
    },
    orderBy: [orderByCondition],
    select,
  });

export const sortSpecialistsByName = specialistList =>
  specialistList.sort((a, b) => {
    const cur = a.lastName ? a.lastName : a.name;
    const next = b.lastName ? b.lastName : b.name;

    return cur.localeCompare(next);
  });

export const getOrganizationById = async ({ id }) =>
  prisma.organization.findUnique({
    where: {
      id,
    },
    select: organizationSelect,
  });

export const getOrganizationsIds = async () => {
  const organizations = await prisma.organization.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
    },
  });

  return organizations.map(({ id }) => id);
};

export const getSpecialistsIds = async () => {
  const specialists = await prisma.specialist.findMany({
    where: {
      isActive: true,
    },
    select: {
      id: true,
    },
  });

  return specialists.map(({ id }) => id);
};

export const getSpecDictionaries = async () => {
  const [clientCategories, specializations, specializationMethods, districts, therapies, requests] = await Promise.all([
    prisma.clientCategory.findMany(),
    prisma.specialization.findMany(),
    prisma.method.findMany(),
    prisma.district.findMany(),
    prisma.therapy.findMany(),
    prisma.request.findMany(),
  ]);
  return { clientCategories, specializations, specializationMethods, districts, therapies, requests };
};
