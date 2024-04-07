import ky from 'ky';
import { useQuery } from '@tanstack/react-query';
import { SocialMediaPlatform } from '@prisma/client';
import { Facebook, Instagram } from '@icons';

export const getSocialMediaList = async () => ky('/api/socialMedia').json();

const socialMediaKey = 'socialMedia';

// Currently supports instagram and facebook only
export function useSocialMediaList() {
  const { data } = useQuery({
    queryKey: [socialMediaKey],
    queryFn: getSocialMediaList,
  });

  return data?.map(({ title, href }) => ({
    title,
    href,
    svg: title === SocialMediaPlatform.INSTAGRAM ? <Instagram /> : <Facebook />,
  }));
}
