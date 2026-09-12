import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';

export const GET = withErrorHandler(async request => {
  const withDistricts = new URL(request.url).searchParams.get('withDistricts') === 'true';

  const cities = await prisma.city.findMany({
    select: {
      id: true,
      name: true,
      ...(withDistricts && { districts: { select: { id: true, name: true }, orderBy: { name: 'asc' } } }),
    },
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(cities);
});
