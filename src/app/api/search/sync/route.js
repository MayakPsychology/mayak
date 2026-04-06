import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { BadRequestException } from '@/lib/errors/BadRequestException';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';
import { createSearchSyncFilter } from '../helpers';

function normalizeSearch(value = '') {
  return value
    .replace(/['`´ʼ’]/g, '’')
    .replace(/[“”«»„‟]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

export const handler = withErrorHandler(async req => {
  const params = getSearchParamsFromRequest(req, {
    searchType: 'request',
    query: undefined,
  });

  const { searchType, query } = params;

  const normalizedQuery = normalizeSearch(query || '');

  const terms = normalizedQuery
    .split(/[,\s]+/)
    .map(q => q.trim())
    .filter(Boolean);

  const searchSyncFilter = createSearchSyncFilter(params);

  const searchTypeFindAndMap = {
    request: {
      find: () => prisma.request.findMany(),
      map: el => ({
        id: el.id,
        title: el.name,
      }),
    },

    organization: {
      find: () =>
        prisma.searchEntry.findMany({
          where: searchSyncFilter,
        }),
      map: el => ({
        id: el.organizationId,
        title: el.sortString,
      }),
    },

    specialist: {
      find: () =>
        prisma.searchEntry.findMany({
          where: searchSyncFilter,
        }),
      map: el => ({
        id: el.specialistId,
        title: el.sortString,
      }),
    },
  };

  if (!(searchType in searchTypeFindAndMap)) {
    throw new BadRequestException({
      message: 'searchType should be request, specialist or organization',
    });
  }

  const rawItems = await searchTypeFindAndMap[searchType].find();

  const items = rawItems.map(searchTypeFindAndMap[searchType].map);

  if (!terms.length) {
    return NextResponse.json({
      data: items,
    });
  }

  const filtered = items.filter(item => {
    const normalizedTitle = normalizeSearch(item.title || '').toLowerCase();

    return terms.every(term => normalizedTitle.includes(normalizeSearch(term).toLowerCase()));
  });

  return NextResponse.json({
    data: filtered,
  });
});

export { handler as GET };
