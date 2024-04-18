'use server';

import { NavigationUrl } from '@prisma/client';
import { prisma } from '@/lib/db';

export async function getLinksList() {
  const data = await prisma.navigation.findMany({
    select: {
      title: true,
      href: true,
    },
  });

  const { APPLICATION } = NavigationUrl;

  return {
    socialMediaLinksList: data?.filter(({ title }) => title !== APPLICATION),
    applicationLink: data?.filter(({ title }) => title === APPLICATION)[0],
  };
}
