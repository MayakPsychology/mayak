import { beforeEach, describe, expect, it, vi } from 'vitest';

const { blob, sentry } = vi.hoisted(() => ({
  blob: { rename: vi.fn(), issueSignedToken: vi.fn(), presignUrl: vi.fn() },
  sentry: { captureException: vi.fn() },
}));

vi.mock('@vercel/blob', () => blob);
vi.mock('@sentry/nextjs', () => sentry);

const { finalizeFiles } = await import('@/services/uploads/finalizeFiles');

const SUBMITTED_PATH = 'submitted/educationFiles/diploma.pdf';
const SUBMITTED_URL = `https://store.blob.vercel-storage.com/${SUBMITTED_PATH}`;
const renamed = () => ({ url: SUBMITTED_URL, pathname: SUBMITTED_PATH });

const file = () => ({
  url: 'https://store.blob.vercel-storage.com/applications/educationFiles/diploma.pdf',
  pathname: 'applications/educationFiles/diploma.pdf',
  name: 'diploma.pdf',
  size: 1024,
});

describe('finalizeFiles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    blob.issueSignedToken.mockResolvedValue({ clientSigningToken: 's', delegationToken: 'd' });
    blob.presignUrl.mockResolvedValue({ presignedUrl: 'https://signed.example/diploma.pdf' });
  });

  it('moves a submitted document out of the upload prefix and signs the link', async () => {
    blob.rename.mockResolvedValue(renamed());

    const [result] = (await finalizeFiles({ educationFiles: [file()] })).educationFiles;

    expect(result.pathname).toBe(SUBMITTED_PATH);
    expect(result.url).toBe('https://signed.example/diploma.pdf');
    expect(sentry.captureException).not.toHaveBeenCalled();
  });

  it('reports a failed rename instead of swallowing it', async () => {
    blob.rename.mockRejectedValue(new Error('store unavailable'));

    const [result] = (await finalizeFiles({ educationFiles: [file()] })).educationFiles;

    expect(sentry.captureException).toHaveBeenCalledOnce();
    const [error, context] = sentry.captureException.mock.calls[0];
    expect(error.message).toBe('store unavailable');
    expect(context.tags.scope).toBe('application-upload-retention');
    expect(context.extra.pathname).toBe('applications/educationFiles/diploma.pdf');
    expect(result.name).toBe('diploma.pdf');
  });

  it('reports a failed presign instead of swallowing it', async () => {
    blob.rename.mockResolvedValue(renamed());
    blob.presignUrl.mockRejectedValue(new Error('signing refused'));

    const [result] = (await finalizeFiles({ educationFiles: [file()] })).educationFiles;

    expect(sentry.captureException).toHaveBeenCalledOnce();
    const [error, context] = sentry.captureException.mock.calls[0];
    expect(error.message).toBe('signing refused');
    expect(context.tags.scope).toBe('application-upload-link');
    expect(result.pathname).toBe(SUBMITTED_PATH);
  });

  it('still sends the application when the whole store is down', async () => {
    blob.rename.mockRejectedValue(new Error('down'));
    blob.issueSignedToken.mockRejectedValue(new Error('down'));

    const data = await finalizeFiles({ firstName: 'Іван', educationFiles: [file()] });

    expect(data.firstName).toBe('Іван');
    expect(data.educationFiles[0].url).toBe(file().url);
  });
});
