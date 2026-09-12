import { beforeEach, describe, expect, it, vi } from 'vitest';
import { APPLICATION_RATE_LIMIT, assertWithinRateLimit } from '@/lib/rateLimit';

const { hits } = vi.hoisted(() => ({ hits: [] }));

vi.mock('@/lib/db', () => ({
  prisma: {
    rateLimitHit: {
      count: async ({ where }) =>
        hits.filter(hit => hit.key === where.key && hit.createdAt >= where.createdAt.gte).length,
      create: async ({ data }) => hits.push({ ...data, createdAt: new Date() }),
      deleteMany: async ({ where }) => {
        const kept = hits.filter(hit => hit.createdAt >= where.createdAt.lt);
        hits.length = 0;
        hits.push(...kept);
      },
    },
  },
}));

const requestFrom = ip => ({ headers: { get: name => (name === 'x-forwarded-for' ? ip : null) } });

const fillUp = async (request, scope) => {
  for (let i = 0; i < APPLICATION_RATE_LIMIT.limit; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await assertWithinRateLimit(request, scope);
  }
};

describe('assertWithinRateLimit', () => {
  beforeEach(() => {
    hits.length = 0;
  });

  it('allows submissions up to the limit then rejects', async () => {
    const request = requestFrom('203.0.113.1');

    await fillUp(request, 'test-allow');

    await expect(assertWithinRateLimit(request, 'test-allow')).rejects.toThrowError();
  });

  it('reports 429 when the limit is exceeded', async () => {
    const request = requestFrom('203.0.113.2');

    await fillUp(request, 'test-status');

    await expect(assertWithinRateLimit(request, 'test-status')).rejects.toMatchObject({ status: 429 });
  });

  it('tracks each client separately', async () => {
    await fillUp(requestFrom('203.0.113.3'), 'test-isolation');

    await expect(assertWithinRateLimit(requestFrom('203.0.113.4'), 'test-isolation')).resolves.toBeUndefined();
  });

  it('tracks each endpoint separately', async () => {
    const request = requestFrom('203.0.113.5');

    await fillUp(request, 'test-scope-a');

    await expect(assertWithinRateLimit(request, 'test-scope-b')).resolves.toBeUndefined();
  });

  it('forgets hits once the window has passed', async () => {
    const request = requestFrom('203.0.113.6');

    await fillUp(request, 'test-window');
    hits.forEach(hit => {
      Object.assign(hit, { createdAt: new Date(Date.now() - APPLICATION_RATE_LIMIT.windowMs - 1000) });
    });

    await expect(assertWithinRateLimit(request, 'test-window')).resolves.toBeUndefined();
  });

  it('uses only the first address from x-forwarded-for', async () => {
    const proxied = { headers: { get: name => (name === 'x-forwarded-for' ? '203.0.113.7, 10.0.0.1' : null) } };

    await fillUp(proxied, 'test-forwarded');

    await expect(assertWithinRateLimit(requestFrom('203.0.113.7'), 'test-forwarded')).rejects.toThrowError();
  });
});
