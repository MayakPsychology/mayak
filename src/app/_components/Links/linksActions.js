'use server';

import { NavigationUrl } from '@prisma/client';
// import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';

export async function getLinksList() {
  const data = await prisma.navigation.findMany({
    select: {
      title: true,
      href: true,
    },
  });

  // revalidatePath('prisma-navigation');
  // revalidateTag('')

  const { APPLICATION } = NavigationUrl;

  return {
    socialMediaList: data?.filter(({ title }) => title !== APPLICATION),
    applicationLink: data?.filter(({ title }) => title === APPLICATION)[0],
  };
}
