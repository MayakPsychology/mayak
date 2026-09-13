export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

export const MAX_FILES = 10;

export const ALLOWED_ATTACHMENT_TYPES = ['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.doc', '.docx'];

export const UPLOAD_RATE_LIMIT = { limit: 60, windowMs: 60 * 60 * 1000 };

export const TOKEN_TTL_MS = 60 * 1000;

export const LINK_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export const ALLOWED_UPLOAD_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const GENERATE_TOKEN = 'blob.generate-client-token';

export const uploadTokenOptions = () => ({
  allowedContentTypes: ALLOWED_UPLOAD_TYPES,
  maximumSizeInBytes: MAX_UPLOAD_SIZE,
  validUntil: Date.now() + TOKEN_TTL_MS,
  addRandomSuffix: true,
});

export const UPLOAD_PREFIX = 'applications';

export const SUBMITTED_PREFIX = 'submitted';

export const ABANDONED_TTL_MS = 24 * 60 * 60 * 1000;

export const RETENTION_MS = 90 * 24 * 60 * 60 * 1000;

export const submittedPathname = pathname =>
  pathname.startsWith(`${UPLOAD_PREFIX}/`)
    ? `${SUBMITTED_PREFIX}/${pathname.slice(UPLOAD_PREFIX.length + 1)}`
    : pathname;

const ttlFor = pathname => {
  if (pathname.startsWith(`${SUBMITTED_PREFIX}/`)) return RETENTION_MS;
  if (pathname.startsWith(`${UPLOAD_PREFIX}/`)) return ABANDONED_TTL_MS;
  return null;
};

export const expiredPathnames = (blobs, now = Date.now()) =>
  blobs
    .filter(blob => {
      const ttl = ttlFor(blob.pathname);
      return ttl !== null && now - new Date(blob.uploadedAt).getTime() > ttl;
    })
    .map(blob => blob.pathname);
