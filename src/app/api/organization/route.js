import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { formDataToObject } from '@/lib/formData';
import { assertWithinRateLimit } from '@/lib/rateLimit';
import { application } from '@/services/organization';

export const POST = withErrorHandler(async request => {
  assertWithinRateLimit(request, 'organization-application');

  const formData = await request.formData();
  const { id } = await application(formDataToObject(formData));

  return NextResponse.json({ success: true, id }, { status: 201 });
});
