import { z } from 'zod';

export const env = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_URL: z.string().url(),
    DATABASE_DIRECT_URL: z.string().url(),
    ADMIN_USERNAME: z.string().min(5),
    ADMIN_PASSWORD: z.string().min(5),
    REVALIDATION_TIME: z.preprocess(val => Number(val), z.number()).default(0),
    RESEND_API_KEY: z.string().min(5),
    ADMIN_EMAIL: z.string().min(5),
  })
  .parse(process.env);
