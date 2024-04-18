import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { createSearchEntryFilter, getSearchFilterQueryParams } from '../helpers';

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);

  const searchEntryFilter = createSearchEntryFilter(params);
  const count = await prisma.searchEntry.count({ where: searchEntryFilter });

  return NextResponse.json({
    data: { count },
  });
});

export { handler as GET };
