import * as Sentry from '@sentry/nextjs';
import { rename } from '@vercel/blob';
import { documentPath, submittedPathname } from '@/lib/uploads';

const isUploadedFile = value =>
  Boolean(value) && typeof value === 'object' && typeof value.url === 'string' && typeof value.pathname === 'string';

const siteUrl = () =>
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000';

export const documentUrl = pathname => `${siteUrl()}${documentPath(pathname)}`;

async function keep(file) {
  try {
    const target = submittedPathname(file.pathname);
    if (target === file.pathname) return file;

    const moved = await rename(file.pathname, target, { access: 'private' });
    return { ...file, pathname: moved.pathname };
  } catch (error) {
    Sentry.captureException(error, {
      tags: { scope: 'application-upload-retention' },
      extra: {
        pathname: file.pathname,
        consequence: 'document stays under the upload prefix and the 24h cleanup will delete it',
      },
    });
    return file;
  }
}

export async function finalizeFiles(value) {
  if (Array.isArray(value)) {
    if (value.length && value.every(isUploadedFile)) {
      const kept = await Promise.all(value.map(keep));
      return kept.map(file => ({ ...file, url: documentUrl(file.pathname) }));
    }
    return Promise.all(value.map(finalizeFiles));
  }

  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, item]) => [key, await finalizeFiles(item)]),
    );
    return Object.fromEntries(entries);
  }

  return value;
}
