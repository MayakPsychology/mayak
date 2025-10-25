import { RESOURCES } from '@/app/(admin)/admin/_lib/consts';
import { getSpecialistFullName } from '@/utils/getSpecialistFullName.mjs';

function createSearchEntryExtension(prisma, type) {
  return async ({ args }) => {
    const isOrganization = type === RESOURCES.organization;
    const { data, select = {} } = args;

    return await prisma.$transaction(async tx => {
      const createdEntity = isOrganization
        ? await tx.organization.create({ data, select })
        : await tx.specialist.create({ data, select });

      const sortString = isOrganization ? createdEntity.name : getSpecialistFullName(createdEntity);

      await tx.searchEntry.create({
        data: {
          sortString,
          organizationId: isOrganization ? createdEntity.id : undefined,
          specialistId: !isOrganization ? createdEntity.id : undefined,
        },
      });

      return createdEntity;
    });
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
