import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { getSearchFilterQueryParams, createSearchEntryFilter } from './helpers';

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);
  const { take, skip } = params;

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
  });

  const terms =
    params.query
      ?.split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean) || [];

  function calcScore(entry) {
    const focuses = entry.specialist?.supportFocuses || entry.organization?.supportFocuses || [];

    const tags = focuses.flatMap(f => f.requests.map(r => r.name.toLowerCase()));

    return terms.filter(t => tags.some(tag => tag.includes(t))).length;
  }

  const ranked = searchEntries.map(e => ({ ...e, score: calcScore(e) })).sort((a, b) => b.score - a.score);

  const minScore = terms.length;
  const filtered = ranked.filter(e => e.score >= minScore);

  const paged = filtered.slice(skip, skip + take);
  const hasNextPage = filtered.length > skip + take;

  return NextResponse.json({
    data: paged,
    metaData: {
      totalCount: filtered.length,
      hasNextPage,
    },
  });
});

export { handler as GET };
