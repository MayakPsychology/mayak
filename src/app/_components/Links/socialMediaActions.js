'use server';

import { NavigationUrl } from '@prisma/client';
import { prisma } from '@/lib/db';

export async function getSocialMediaList() {
  const data = await prisma.navigation.findMany({
    select: {
      title: true,
      href: true,
    },
  });

  const { APPLICATION } = NavigationUrl;

  return {
    socialMediaList: data?.filter(({ title }) => title !== APPLICATION),
    applicationLink: data?.filter(({ title }) => title === APPLICATION)[0],
  };
}
