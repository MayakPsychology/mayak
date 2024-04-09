'use server';

import { NavigationUrl } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/db';

export async function getLinksList() {
  const data = await prisma.navigation.findMany({
    select: {
      title: true,
      href: true,
    },
  });

  const { APPLICATION } = NavigationUrl;

  // temporary solution to ensure the links are up-to-date with the db
  revalidateTag('/');

  return {
    socialMediaList: data?.filter(({ title }) => title !== APPLICATION),
    applicationLink: data?.filter(({ title }) => title === APPLICATION)[0],
  };
}
