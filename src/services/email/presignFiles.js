import { issueSignedToken, presignUrl } from '@vercel/blob';
import { LINK_TTL_MS } from '@/lib/uploads';

const isUploadedFile = value =>
  Boolean(value) && typeof value === 'object' && typeof value.url === 'string' && typeof value.pathname === 'string';

async function signOne(file) {
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

export async function presignFiles(value) {
  if (Array.isArray(value)) {
    if (value.every(isUploadedFile) && value.length) return Promise.all(value.map(signOne));
    return Promise.all(value.map(presignFiles));
  }

  if (value && typeof value === 'object' && !(value instanceof Date)) {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, item]) => [key, await presignFiles(item)]),
    );
    return Object.fromEntries(entries);
  }

  return value;
}
