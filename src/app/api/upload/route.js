import { NextResponse } from 'next/server';
import { handleUpload } from '@vercel/blob/client';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { assertWithinRateLimit } from '@/lib/rateLimit';
import { GENERATE_TOKEN, UPLOAD_RATE_LIMIT, uploadTokenOptions } from '@/lib/uploads';

export const POST = withErrorHandler(async request => {
  const body = await request.json();

  if (body?.type === GENERATE_TOKEN) {
    await assertWithinRateLimit(request, 'application-upload', UPLOAD_RATE_LIMIT);
  }

  const result = await handleUpload({
    request,
    body,
    onBeforeGenerateToken: async () => uploadTokenOptions(),
  });

  return NextResponse.json(result);
});
