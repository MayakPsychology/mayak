import { prisma } from '@/lib/db';
import { organizationInclude, specialistInclude } from '@/app/(app)/specialist/consts';

export const getSpecialistById = async ({ id }) =>
  prisma.specialist.findUnique({
    where: {
      id,
    },
    include: specialistInclude,
  });

export const getSpecialists = async ({ model, orderByCondition, include }) =>
  await prisma[model].findMany({
    where: {
      isActive: true,
    },
    orderBy: [orderByCondition],
    include,
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
    include: organizationInclude,
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
}

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
}