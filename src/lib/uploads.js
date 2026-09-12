export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

export const UPLOAD_RATE_LIMIT = { limit: 60, windowMs: 60 * 60 * 1000 };

export const TOKEN_TTL_MS = 60 * 1000;

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
