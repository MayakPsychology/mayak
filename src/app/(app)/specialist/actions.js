import { unstable_cache as unstableCache } from 'next/cache';
import { prisma } from '@/lib/db';

export const getFilterData = unstableCache(
  async () => {
    'use server';

    const [districts, therapies, categories, specializations] = await Promise.all([
      prisma.district.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
      prisma.therapy.findMany({
        where: { isActive: true },
        select: {
          id: true,
          type: true,
          title: true,
          description: true,
          requests: {
            select: { id: true, name: true, simpleId: true },
          },
        },
        orderBy: { priority: 'desc' },
      }),
      prisma.clientCategory.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
      prisma.specialization.findMany({
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
      }),
    ]);
    return { districts, therapies, categories, specializations };
  },
  ['filter-data'],
  { revalidate: 3600, tags: ['filters'] },
);
