import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { del, put } from '@vercel/blob';
import { SUBMITTED_PREFIX, UPLOAD_PREFIX } from '@/lib/uploads';

const { sentry } = vi.hoisted(() => ({ sentry: { captureException: vi.fn() } }));
vi.mock('@sentry/nextjs', () => sentry);

const { finalizeFiles } = await import('@/services/uploads/finalizeFiles');

try {
  if (!process.env.BLOB_READ_WRITE_TOKEN) process.loadEnvFile('.env.local');
} catch {
  // no .env.local — the suite skips below
}

const CONTENT = 'диплом: підтвердження освіти';
const TIMEOUT = 30_000;

describe.skipIf(!process.env.BLOB_READ_WRITE_TOKEN)('finalizeFiles against a live Blob store', () => {
  const planted = [];
  let uploaded;
  let finalized;

  beforeAll(async () => {
    uploaded = await put(`${UPLOAD_PREFIX}/tests/${crypto.randomUUID()}/diploma.txt`, CONTENT, {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'text/plain',
    });
    planted.push(uploaded.pathname);

    finalized = await finalizeFiles({
      firstName: 'Іван',
      educationFiles: [{ url: uploaded.url, pathname: uploaded.pathname, name: 'diploma.txt', size: CONTENT.length }],
    });
    planted.push(finalized.educationFiles[0].pathname);
  }, TIMEOUT);

  afterAll(async () => {
    await del(planted).catch(() => {});
  }, TIMEOUT);

  it('moves the document under the retention prefix', () => {
    expect(finalized.educationFiles[0].pathname.startsWith(`${SUBMITTED_PREFIX}/`)).toBe(true);
    expect(sentry.captureException).not.toHaveBeenCalled();
  });

  it('signs a link the admin can actually open', async () => {
    const response = await fetch(finalized.educationFiles[0].url);

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe(CONTENT);
  });

  it('leaves the document unreadable without the signature', async () => {
    const unsigned = finalized.educationFiles[0].url.split('?')[0];

    expect((await fetch(unsigned)).ok).toBe(false);
  });

  it('carries the rest of the application through untouched', () => {
    expect(finalized.firstName).toBe('Іван');
    expect(finalized.educationFiles[0].name).toBe('diploma.txt');
  });
});
