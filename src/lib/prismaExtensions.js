import { RESOURCES } from '@/app/(admin)/admin/_lib/consts';
import { getSpecialistFullName } from '@/utils/getSpecialistFullName.mjs';

function createSearchEntryExtension(prisma, type) {
  return async ({ args }) => {
    const isOrganization = type === RESOURCES.organization;
    const sortString = isOrganization ? args.data.name : getSpecialistFullName(args.data);
    const searchEntry = await prisma.searchEntry.create({
      data: {
        sortString,
        ...(isOrganization ? { organization: { create: args.data } } : { specialist: { create: args.data } }),
      },
      select: isOrganization ? { organization: args.select || {} } : { specialist: args.select || {} },
    });
    return isOrganization ? searchEntry.organization : searchEntry.specialist;
  };
}

function updateSearchEntryExtension(prisma, type) {
  return async ({ args }) => {
    const isOrganization = type === RESOURCES.organization;
    const sortString = isOrganization ? args.data.name : getSpecialistFullName(args.data);
    const searchEntry = await prisma.searchEntry.update({
      data: {
        sortString,
        ...(isOrganization ? { organization: { update: args.data } } : { specialist: { update: args.data } }),
      },
      where: {
        ...(isOrganization ? { organizationId: args.where.id } : { specialistId: args.where.id }),
      },
      select: isOrganization ? { organization: args.select || {} } : { specialist: args.select || {} },
    });
    return isOrganization ? searchEntry.organization : searchEntry.specialist;
  };
}

export function specialistQueryExtension(prisma) {
  return {
    create: createSearchEntryExtension(prisma, RESOURCES.specialist),
    update: updateSearchEntryExtension(prisma, RESOURCES.specialist),
  };
}

export function organizationQueryExtension(prisma) {
  return {
    create: createSearchEntryExtension(prisma, RESOURCES.organization),
    update: updateSearchEntryExtension(prisma, RESOURCES.organization),
  };
}
