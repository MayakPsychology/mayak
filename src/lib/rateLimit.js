import { prisma } from '@/lib/db';
import { TooManyRequestsException } from '@/lib/errors/TooManyRequestsException';

export const APPLICATION_RATE_LIMIT = { limit: 10, windowMs: 60 * 60 * 1000 };

function getClientKey(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export async function assertWithinRateLimit(request, scope, { limit, windowMs } = APPLICATION_RATE_LIMIT) {
  const key = `${scope}:${getClientKey(request)}`;
  const since = new Date(Date.now() - windowMs);

  await prisma.rateLimitHit.deleteMany({ where: { createdAt: { lt: since } } });

  const hits = await prisma.rateLimitHit.count({ where: { key, createdAt: { gte: since } } });

  if (hits >= limit) {
    throw new TooManyRequestsException({ message: 'Забагато заявок. Спробуйте пізніше.' });
  }

  await prisma.rateLimitHit.create({ data: { key } });
}
