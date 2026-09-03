import { TooManyRequestsException } from '@/lib/errors/TooManyRequestsException';

const buckets = new Map();

export const APPLICATION_RATE_LIMIT = { limit: 10, windowMs: 60 * 60 * 1000 };

function getClientKey(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function assertWithinRateLimit(request, scope, { limit, windowMs } = APPLICATION_RATE_LIMIT) {
  const now = Date.now();
  const key = `${scope}:${getClientKey(request)}`;
  const hits = (buckets.get(key) ?? []).filter(timestamp => now - timestamp < windowMs);

  if (hits.length >= limit) {
    throw new TooManyRequestsException({ message: 'Забагато заявок. Спробуйте пізніше.' });
  }

  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > 5000) {
    buckets.forEach((timestamps, bucketKey) => {
      if (timestamps.every(timestamp => now - timestamp >= windowMs)) buckets.delete(bucketKey);
    });
  }
}
