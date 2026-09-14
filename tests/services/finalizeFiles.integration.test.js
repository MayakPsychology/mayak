import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { del, put } from '@vercel/blob';
import { SUBMITTED_PREFIX, UPLOAD_PREFIX } from '@/lib/uploads';

const { sentry } = vi.hoisted(() => ({ sentry: { captureException: vi.fn() } }));
vi.mock('@sentry/nextjs', () => sentry);

const { finalizeFiles } = await import('@/services/uploads/finalizeFiles');
const { signDocumentUrl } = await import('@/services/uploads/signDocument');

try {
  if (!process.env.BLOB_READ_WRITE_TOKEN) process.loadEnvFile('.env.local');
} catch {
  // no .env.local — the suite skips below
}

const CONTENT = 'диплом: підтвердження освіти';
const TIMEOUT = 30_000;

describe.skipIf(!process.env.BLOB_READ_WRITE_TOKEN)('document retention against a live Blob store', () => {
  const planted = [];
  let document;
  let finalized;

  beforeAll(async () => {
    const uploaded = await put(`${UPLOAD_PREFIX}/tests/${crypto.randomUUID()}/diploma.txt`, CONTENT, {
      access: 'private',
      addRandomSuffix: false,
      contentType: 'text/plain',
    });
    planted.push(uploaded.pathname);

    finalized = await finalizeFiles({
      firstName: 'Іван',
      educationFiles: [{ url: uploaded.url, pathname: uploaded.pathname, name: 'diploma.txt', size: CONTENT.length }],
    });
    [document] = finalized.educationFiles;
    planted.push(document.pathname);
  }, TIMEOUT);

  afterAll(async () => {
    await del(planted).catch(() => {});
  }, TIMEOUT);

  it('moves the document under the retention prefix', () => {
    expect(document.pathname.startsWith(`${SUBMITTED_PREFIX}/`)).toBe(true);
    expect(sentry.captureException).not.toHaveBeenCalled();
  });

  it('points the email at the admin route rather than at a link that expires', () => {
    expect(document.url).toContain(`/api/admin/documents?pathname=${encodeURIComponent(document.pathname)}`);
    expect(finalized.firstName).toBe('Іван');
  });

  it('signs a link the admin can actually open', async () => {
    const response = await fetch(await signDocumentUrl(document.pathname));

    expect(response.status).toBe(200);
    await expect(response.text()).resolves.toBe(CONTENT);
  });

  it('leaves the document unreadable without the signature', async () => {
    const signed = await signDocumentUrl(document.pathname);

    expect((await fetch(signed.split('?')[0])).ok).toBe(false);
  });
});
