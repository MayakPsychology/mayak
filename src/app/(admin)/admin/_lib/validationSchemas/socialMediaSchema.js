import { z } from 'zod';
import { SocialMediaPlatform } from '@prisma/client';

export const SocialMediaSchema = z.object({
  title: z.enum(Object.values(SocialMediaPlatform)),
  link: z.string().url(),
});
