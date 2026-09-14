import { issueSignedToken, presignUrl } from '@vercel/blob';
import { VIEW_TTL_MS } from '@/lib/uploads';

export async function signDocumentUrl(pathname) {
  const validUntil = Date.now() + VIEW_TTL_MS;
  const token = await issueSignedToken({ pathname, operations: ['get'], validUntil });
  const { presignedUrl } = await presignUrl(token, {
    operation: 'get',
    pathname,
    access: 'private',
    validUntil,
  });

  return presignedUrl;
}
