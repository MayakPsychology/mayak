import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import {
  getSearchFilterQueryParams,
  createSearchEntryFilter,
  createSpecialistFilter,
  createOrganizationFilter,
} from './helpers';

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);
  const { take, skip, lastCursor } = params;

  const sharedInclude = {
    supportFocuses: {
      select: {
        id: true,
        price: true,
        therapy: true,
        requests: true,
      },
    },
    addresses: {
      select: {
        id: true,
        nameOfClinic: true,
        fullAddress: true,
        latitude: true,
        longitude: true,
        district: { select: { id: true, name: true } },
        isPrimary: true,
      },
    },
    workTime: {
      select: {
        weekDay: true,
        time: true,
        isDayOff: true,
      },
    },
    clientsWorkingWith: true,
    clientsNotWorkingWith: true,
  };

  /* ======================================================
     ✅ FREE FILTER → ENTITY LEVEL (Specialist / Organization)
     ====================================================== */
  if (params.isFree === true) {
    const specialistWhere = createSpecialistFilter(params);
    const organizationWhere = createOrganizationFilter(params);

    const results = [];

    if (!params.searchType || params.searchType === 'specialist') {
      const specialists = await prisma.specialist.findMany({
        where: specialistWhere,
        include: {
          ...sharedInclude,
          specializationMethods: { select: { id: true, simpleId: true, title: true, description: true } },
          specializations: { select: { id: true, name: true } },
        },
        take,
        skip,
      });

      results.push(
        ...specialists.map(s => ({
          id: `free-specialist-${s.id}`,
          specialist: s,
          organization: null,
        })),
      );
    }

    if (!params.searchType || params.searchType === 'organization') {
      const organizations = await prisma.organization.findMany({
        where: organizationWhere,
        include: {
          ...sharedInclude,
          type: { select: { id: true, name: true } },
          expertSpecializations: { select: { id: true, name: true } },
        },
        take,
        skip,
      });

      results.push(
        ...organizations.map(o => ({
          id: `free-organization-${o.id}`,
          specialist: null,
          organization: o,
        })),
      );
    }

    return NextResponse.json({
      data: results,
      metaData: {
        totalCount: results.length,
        hasNextPage: false,
      },
    });
  }

  /* ======================================================
     🔽 DEFAULT SEARCH (SearchEntry – text search, ranking)
     ====================================================== */
  const searchEntryFilter = createSearchEntryFilter(params);
  const totalCount = await prisma.searchEntry.count({
    where: searchEntryFilter,
  });

  const takeFilter = params?.mode === 'map' ? totalCount : take;

  const searchEntries = await prisma.searchEntry.findMany({
    include: {
      specialist: {
        include: {
          ...sharedInclude,
          specializationMethods: {
            select: { id: true, simpleId: true, title: true, description: true },
          },
          specializations: {
            select: { id: true, name: true },
          },
        },
      },
      organization: {
        include: {
          ...sharedInclude,
          type: { select: { id: true, name: true } },
          expertSpecializations: {
            select: { id: true, name: true },
          },
        },
      },
    },
    where: searchEntryFilter,
    orderBy: {
      sortString: 'asc',
    },
    take: takeFilter + 1,
    skip,
    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: lastCursor,
      },
    }),
  });

  let nextPageEntry;
  if (searchEntries.length > takeFilter) {
    nextPageEntry = searchEntries.pop();
  }

  const hasNextPage = !!nextPageEntry;
  const newCursor = hasNextPage ? searchEntries[take - 1]?.id : undefined;

  return NextResponse.json({
    data: searchEntries,
    metaData: {
      totalCount,
      lastCursor: newCursor,
      hasNextPage,
    },
  });
});

export { handler as GET };
