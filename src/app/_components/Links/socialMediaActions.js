'use server';

import { Facebook, Instagram } from '@icons';
import { revalidateTag } from 'next/cache';
import { NavigationUrl } from '@prisma/client';
import { prisma } from '@/lib/db';

export async function getSocialMediaList() {
  const data = await prisma.navigation.findMany({
    select: {
      title: true,
      href: true,
    },
  });

  revalidateTag('/');

  const { INSTAGRAM, APPLICATION } = NavigationUrl;

  const socialMediaList = data
    ?.filter(({ title }) => title !== APPLICATION)
    .map(({ title, href }) => ({
      title,
      href,
      svg: title === INSTAGRAM ? <Instagram /> : <Facebook />,
    }));

  const applicationLink = data?.find(({ title }) => title === APPLICATION);

  return {
    socialMediaList,
    applicationLink,
  };
}
