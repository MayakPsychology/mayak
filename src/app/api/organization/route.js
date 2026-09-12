import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { formDataToAttachments, formDataToObject } from '@/lib/formData';
import { assertWithinRateLimit } from '@/lib/rateLimit';
import { application } from '@/services/organization';

export const POST = withErrorHandler(async request => {
  await assertWithinRateLimit(request, 'organization-application');

  const formData = await request.formData();
  const { id } = await application(formDataToObject(formData), await formDataToAttachments(formData));

  return NextResponse.json({ success: true, id }, { status: 201 });
});
