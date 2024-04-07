import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';

export const GET = withErrorHandler(async () => {
  const data = await prisma.socialMedia.findMany({
    select: {
      title: true,
      href: true,
    },
  });
  return new Response(JSON.stringify(data), { status: 200 });
});
