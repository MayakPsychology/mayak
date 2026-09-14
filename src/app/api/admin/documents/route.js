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
    const pathname = pathnameSchema.parse(request.nextUrl.searchParams.get('pathname'));

    if (!request.auth) {
      const login = new URL(LOGIN_URL, request.nextUrl.origin);
      login.searchParams.set('document', pathname);
      return NextResponse.redirect(login);
    }

    return NextResponse.redirect(await signDocumentUrl(pathname));
  }),
);
