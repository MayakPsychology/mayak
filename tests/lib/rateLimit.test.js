import { describe, expect, it } from 'vitest';
import { APPLICATION_RATE_LIMIT, assertWithinRateLimit } from '@/lib/rateLimit';

const requestFrom = ip => ({ headers: { get: name => (name === 'x-forwarded-for' ? ip : null) } });

describe('assertWithinRateLimit', () => {
  it('allows submissions up to the limit then rejects', () => {
    const request = requestFrom('203.0.113.1');

    for (let i = 0; i < APPLICATION_RATE_LIMIT.limit; i += 1) {
      expect(() => assertWithinRateLimit(request, 'test-allow')).not.toThrow();
    }

    expect(() => assertWithinRateLimit(request, 'test-allow')).toThrowError();
  });

  it('reports 429 when the limit is exceeded', () => {
    const request = requestFrom('203.0.113.2');

    for (let i = 0; i < APPLICATION_RATE_LIMIT.limit; i += 1) {
      assertWithinRateLimit(request, 'test-status');
    }

    try {
      assertWithinRateLimit(request, 'test-status');
      throw new Error('expected the rate limiter to reject');
    } catch (error) {
      expect(error.status).toBe(429);
    }
  });

  it('tracks each client separately', () => {
    for (let i = 0; i < APPLICATION_RATE_LIMIT.limit; i += 1) {
      assertWithinRateLimit(requestFrom('203.0.113.3'), 'test-isolation');
    }

    expect(() => assertWithinRateLimit(requestFrom('203.0.113.4'), 'test-isolation')).not.toThrow();
  });

  it('tracks each endpoint separately', () => {
    const request = requestFrom('203.0.113.5');

    for (let i = 0; i < APPLICATION_RATE_LIMIT.limit; i += 1) {
      assertWithinRateLimit(request, 'test-scope-a');
    }

    expect(() => assertWithinRateLimit(request, 'test-scope-b')).not.toThrow();
  });

  it('uses only the first address from x-forwarded-for', () => {
    const proxied = { headers: { get: name => (name === 'x-forwarded-for' ? '203.0.113.6, 10.0.0.1' : null) } };
    const direct = requestFrom('203.0.113.6');

    for (let i = 0; i < APPLICATION_RATE_LIMIT.limit; i += 1) {
      assertWithinRateLimit(proxied, 'test-forwarded');
    }

    expect(() => assertWithinRateLimit(direct, 'test-forwarded')).toThrowError();
  });
});
