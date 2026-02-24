import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { getSearchFilterQueryParams, createSearchEntryFilter } from './helpers';
import { searchScoreService } from './searchScoreService';

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);
  const { take, skip } = params;

  const takeNum = Number(take ?? 5);
  const skipNum = Number(skip ?? 0);

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

  const searchEntryFilter = createSearchEntryFilter(params);

  const terms =
    params.query
      ?.split(',')
      .map(t => t.trim())
      .filter(Boolean) || [];

  let data = [];
  let totalCount = 0;

  if (terms.length) {
    const { ids, totalCount: count } = await searchScoreService({
      terms,
      take: takeNum,
      skip: skipNum,
      filterParams: params,
    });

    totalCount = count;

    if (ids.length) {
      const entries = await prisma.searchEntry.findMany({
        where: {
          id: { in: ids },
        },
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
      });

      const byId = new Map(entries.map(e => [e.id, e]));
      data = ids.map(id => byId.get(id)).filter(Boolean);
    }
  } else {
    totalCount = await prisma.searchEntry.count({
      where: searchEntryFilter,
    });

    data = await prisma.searchEntry.findMany({
      where: searchEntryFilter,
      skip: skipNum,
      take: takeNum,
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
      orderBy: { id: 'asc' },
    });
  }

  const hasNextPage = skipNum + data.length < totalCount;

  return NextResponse.json({
    data,
    metaData: {
      totalCount,
      hasNextPage,
      take: takeNum,
      skip: skipNum,
    },
  });
});

export { handler as GET };
