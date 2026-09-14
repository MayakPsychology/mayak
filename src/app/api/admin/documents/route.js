import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { LOGIN_URL } from '@/lib/consts';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { SUBMITTED_PREFIX } from '@/lib/uploads';
import { signDocumentUrl } from '@/services/uploads/signDocument';

const pathnameSchema = z.string().startsWith(`${SUBMITTED_PREFIX}/`);

export const GET = auth(
  withErrorHandler(async request => {
    if (!request.auth) return NextResponse.redirect(new URL(LOGIN_URL, request.nextUrl.origin));

    const pathname = pathnameSchema.parse(request.nextUrl.searchParams.get('pathname'));

    return NextResponse.redirect(await signDocumentUrl(pathname));
  }),
);
