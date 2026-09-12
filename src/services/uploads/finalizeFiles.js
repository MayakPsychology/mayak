import { issueSignedToken, presignUrl, rename } from '@vercel/blob';
import { LINK_TTL_MS, submittedPathname } from '@/lib/uploads';

const isUploadedFile = value =>
  Boolean(value) && typeof value === 'object' && typeof value.url === 'string' && typeof value.pathname === 'string';

async function keep(file) {
  try {
    const target = submittedPathname(file.pathname);
    if (target === file.pathname) return file;

    const moved = await rename(file.pathname, target, { access: 'private' });
    return { ...file, url: moved.url, pathname: moved.pathname };
  } catch {
    return file;
  }
}

async function sign(file) {
  try {
    const validUntil = Date.now() + LINK_TTL_MS;
    const token = await issueSignedToken({ pathname: file.pathname, operations: ['get'], validUntil });
    const { presignedUrl } = await presignUrl(token, {
      operation: 'get',
      pathname: file.pathname,
      access: 'private',
      validUntil,
    });

    return { ...file, url: presignedUrl };
  } catch {
    return file;
  }
}

export async function finalizeFiles(value) {
  if (Array.isArray(value)) {
    if (value.length && value.every(isUploadedFile)) {
      const kept = await Promise.all(value.map(keep));
      return Promise.all(kept.map(sign));
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
