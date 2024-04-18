import { prisma } from '@/lib/db';

export const getFilterData = async () => {
  'use server';

  const [districts, therapies, categories, specializations] = await Promise.all([
    prisma.district.findMany(),
    prisma.therapy.findMany({
      include: {
        requests: true,
      },
    }),
    prisma.clientCategory.findMany(),
    prisma.specialization.findMany(),
  ]);
  return { districts, therapies, categories, specializations };
};
