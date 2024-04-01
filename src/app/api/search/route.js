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
  };

  const searchEntriesPlusOneExtra = await prisma.searchEntry.findMany({
    include: {
      specialist: {
        include: {
          ...sharedInclude,
          specializationMethods: { select: { id: true, title: true, description: true } },
          specializations: { select: { id: true, name: true } },
        },
      },
      organization: {
        include: {
          ...sharedInclude,
          type: { select: { id: true, name: true } },
          expertSpecializations: { select: { name: true } },
        },
      },
    },
    where: searchEntryFilter,
    orderBy: {
      sortString: 'asc',
    },
    // take one more, to see if there next page available
    take: take + 1,
    skip,
    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: lastCursor,
      },
    }),
  });
  // take last one
  const isNextPageExist = searchEntriesPlusOneExtra.length === take + 1;
  // take rest ( page requested )
  const results = searchEntriesPlusOneExtra.slice(0, -1);
  const lastResult = results.slice(-1)[0];
  const newCursor = lastResult?.id;

  return NextResponse.json({
    data: results,
    metaData: {
      totalCount,
      lastCursor: newCursor,
      hasNextPage: isNextPageExist,
    },
  });
});

export { handler as GET };
