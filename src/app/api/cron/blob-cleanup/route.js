import { NextResponse } from 'next/server';
import { del, list } from '@vercel/blob';
import { NotAuthorizedException } from '@/lib/errors/NotAuthorizedException';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { env } from '@/lib/env';
import { expiredPathnames } from '@/lib/uploads';

const DELETE_BATCH = 100;

function assertCronRequest(request) {
  if (!env.CRON_SECRET || request.headers.get('authorization') !== `Bearer ${env.CRON_SECRET}`) {
    throw new NotAuthorizedException();
  }
}

export const GET = withErrorHandler(async request => {
  assertCronRequest(request);

  const expired = [];
  let cursor;

  do {
    // eslint-disable-next-line no-await-in-loop
    const { blobs, cursor: next, hasMore } = await list({ cursor, limit: 1000 });
    expired.push(...expiredPathnames(blobs));
    cursor = hasMore ? next : undefined;
  } while (cursor);

  for (let i = 0; i < expired.length; i += DELETE_BATCH) {
    // eslint-disable-next-line no-await-in-loop
    await del(expired.slice(i, i + DELETE_BATCH));
  }

  return NextResponse.json({ deleted: expired.length });
});
