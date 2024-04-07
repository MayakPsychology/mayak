import { SocialMediaPlatform } from '@prisma/client';

export const socialMediaChoices = Object.values(SocialMediaPlatform).map(item => ({
  id: item,
  name: item,
}));
