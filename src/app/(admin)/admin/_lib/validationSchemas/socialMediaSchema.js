import { z } from 'zod';
import { SocialMediaPlatform } from '@prisma/client';

export const SocialMediaSchema = z.object({
  title: z.enum(Object.values(SocialMediaPlatform)),
  href: z.string().url(),
});
