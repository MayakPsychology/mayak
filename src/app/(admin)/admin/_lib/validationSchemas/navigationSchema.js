import { z } from 'zod';
import { NavigationUrl } from '@prisma/client';

export const NavigationSchema = z.object({
  title: z.enum(Object.values(NavigationUrl)).nullish(),
  href: z.string().url(),
});
