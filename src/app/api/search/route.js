import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { createSearchEntryFilter, getSearchFilterQueryParams } from './helpers';

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);
  const { take, skip, lastCursor } = params;

  const searchEntryFilter = createSearchEntryFilter(params);
  const totalCount = await prisma.searchEntry.count({ where: searchEntryFilter });

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

  const takeFilter = params?.mode === 'map' ? totalCount : take;
  const searchEntries = await prisma.searchEntry.findMany({
    include: {
      specialist: {
        include: {
          ...sharedInclude,
          specializationMethods: { select: { id: true, simpleId: true, title: true, description: true } },
          specializations: { select: { id: true, name: true } },
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

  const newCursor = hasNextPage ? searchEntries[take - 1].id : undefined;
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
