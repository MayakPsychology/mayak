import { beforeEach, describe, expect, it, vi } from 'vitest';

const { blob, sentry } = vi.hoisted(() => ({
  blob: { rename: vi.fn() },
  sentry: { captureException: vi.fn() },
}));

vi.mock('@vercel/blob', () => blob);
vi.mock('@sentry/nextjs', () => sentry);

const { finalizeFiles } = await import('@/services/uploads/finalizeFiles');

const UPLOAD_PATH = 'applications/educationFiles/diploma.pdf';
const SUBMITTED_PATH = 'submitted/educationFiles/diploma.pdf';
const renamed = () => ({ url: `https://store.blob.vercel-storage.com/${SUBMITTED_PATH}`, pathname: SUBMITTED_PATH });

const file = () => ({
  url: `https://store.blob.vercel-storage.com/${UPLOAD_PATH}`,
  pathname: UPLOAD_PATH,
  name: 'diploma.pdf',
  size: 1024,
});

describe('finalizeFiles', () => {
  beforeEach(() => vi.clearAllMocks());

  it('moves a submitted document out of the upload prefix and links it through the admin route', async () => {
    blob.rename.mockResolvedValue(renamed());

    const [result] = (await finalizeFiles({ educationFiles: [file()] })).educationFiles;

    expect(result.pathname).toBe(SUBMITTED_PATH);
    expect(result.url).toBe(`http://localhost:3000/api/admin/documents?pathname=${encodeURIComponent(SUBMITTED_PATH)}`);
    expect(sentry.captureException).not.toHaveBeenCalled();
  });

  it('reports a failed rename instead of swallowing it', async () => {
    blob.rename.mockRejectedValue(new Error('store unavailable'));

    const [result] = (await finalizeFiles({ educationFiles: [file()] })).educationFiles;

    expect(sentry.captureException).toHaveBeenCalledOnce();
    const [error, context] = sentry.captureException.mock.calls[0];
    expect(error.message).toBe('store unavailable');
    expect(context.tags.scope).toBe('application-upload-retention');
    expect(context.extra.pathname).toBe(UPLOAD_PATH);
    expect(result.name).toBe('diploma.pdf');
  });

  it('still sends the application when the whole store is down', async () => {
    blob.rename.mockRejectedValue(new Error('down'));

    const data = await finalizeFiles({ firstName: 'Іван', educationFiles: [file()] });

    expect(data.firstName).toBe('Іван');
    expect(data.educationFiles[0].pathname).toBe(UPLOAD_PATH);
  });
});
