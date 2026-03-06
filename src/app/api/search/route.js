import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { getSearchFilterQueryParams, createSearchEntryFilter } from './helpers';
import { searchScoreService } from './searchScoreService';

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);
  const { take, skip, mode } = params;

  const takeNum = Number(take ?? 5);
  const skipNum = Number(skip ?? 0);

  const searchEntryFilter = createSearchEntryFilter(params);

  const terms =
    params.query
      ?.split(',')
      .map(t => t.trim())
      .filter(Boolean) || [];

  /* ---------------- FULL SELECT (fixed) ---------------- */

  const searchListSelect = {
    id: true,
    sortString: true,
    specialist: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        surname: true,
        gender: true,
        yearsOfExperience: true,
        formatOfWork: true,
        isFreeReception: true,
        description: true,
        phone: true,
        email: true,
        website: true,
        instagram: true,
        facebook: true,
        youtube: true,
        linkedin: true,
        tiktok: true,
        viber: true,
        telegram: true,
        isActive: true,
        _count: {
          select: {
            supportFocuses: true,
            workTime: true,
          },
        },
        addresses: {
          where: { isPrimary: true },
          take: 1,
          select: {
            id: true,
            nameOfClinic: true,
            fullAddress: true,
            latitude: true,
            longitude: true,
            isPrimary: true,
            district: { select: { id: true, name: true } },
          },
        },
        specializations: {
          take: 3,
          select: { id: true, name: true },
        },
        supportFocuses: {
          select: {
            id: true,
            price: true,
            therapy: {
              select: {
                id: true,
                type: true,
                title: true,
                description: true,
              },
            },
            requests: {
              select: {
                id: true,
                name: true,
                simpleId: true,
              },
            },
          },
        },
        specializationMethods: {
          select: {
            id: true,
            simpleId: true,
            title: true,
            description: true,
          },
        },
        clientsWorkingWith: {
          select: { id: true, name: true },
        },
        clientsNotWorkingWith: {
          select: { id: true, name: true },
        },
      },
    },
    organization: {
      select: {
        id: true,
        name: true,
        yearsOnMarket: true,
        formatOfWork: true,
        ownershipType: true,
        isInclusiveSpace: true,
        isFreeReception: true,
        description: true,
        phone: true,
        email: true,
        website: true,
        instagram: true,
        facebook: true,
        youtube: true,
        linkedin: true,
        tiktok: true,
        viber: true,
        telegram: true,
        isActive: true,
        _count: {
          select: {
            supportFocuses: true,
            workTime: true,
          },
        },
        addresses: {
          where: { isPrimary: true },
          take: 1,
          select: {
            id: true,
            nameOfClinic: true,
            fullAddress: true,
            latitude: true,
            longitude: true,
            isPrimary: true,
            district: { select: { id: true, name: true } },
          },
        },
        type: {
          select: { id: true, name: true },
        },
        expertSpecializations: {
          take: 3,
          select: { id: true, name: true },
        },
        supportFocuses: {
          select: {
            id: true,
            price: true,
            therapy: {
              select: {
                id: true,
                type: true,
                title: true,
                description: true,
              },
            },
            requests: {
              select: {
                id: true,
                name: true,
                simpleId: true,
              },
            },
          },
        },
        clientsWorkingWith: {
          select: { id: true, name: true },
        },
        clientsNotWorkingWith: {
          select: { id: true, name: true },
        },
      },
    },
  };

  let data = [];
  let totalCount = 0;

  /* ---------------- MAP MODE ---------------- */

  if (mode === 'map') {
    totalCount = await prisma.searchEntry.count({
      where: searchEntryFilter,
    });

    data = await prisma.searchEntry.findMany({
      where: searchEntryFilter,
      select: searchListSelect,
      orderBy: { sortString: 'asc' },
    });
  } else if (terms.length) {
    /* ---------------- SCORE SEARCH (SQL ENGINE) ---------------- */

    const { ids, totalCount: count } = await searchScoreService({
      terms,
      take: takeNum,
      skip: skipNum,
      filterParams: params,
    });

    totalCount = count;

    if (ids.length) {
      const entries = await prisma.searchEntry.findMany({
        where: { id: { in: ids } },
        select: searchListSelect,
      });

      const byId = new Map(entries.map(e => [e.id, e]));
      data = ids.map(id => byId.get(id)).filter(Boolean);
    }
  } else {
    /* ---------------- NORMAL FILTER SEARCH ---------------- */

    totalCount = await prisma.searchEntry.count({
      where: searchEntryFilter,
    });

    data = await prisma.searchEntry.findMany({
      where: searchEntryFilter,
      skip: skipNum,
      take: takeNum,
      select: searchListSelect,
      orderBy: { sortString: 'asc' },
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
