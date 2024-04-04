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

  const searchEntries = await prisma.searchEntry.findMany({
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
    take: params?.mode === 'map' ? 99999 : take,
    skip,
    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: lastCursor,
      },
    }),
  });

  const isNextPageExist = searchEntries.length === take;
  const lastResult = searchEntries.slice(-1)[0];
  const newCursor = lastResult?.id;

  return NextResponse.json({
    data: searchEntries,
    metaData: {
      totalCount,
      lastCursor: newCursor,
      hasNextPage: isNextPageExist,
    },
  });
});

export { handler as GET };
