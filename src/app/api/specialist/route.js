import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { application } from '@/services/specialist';

export const POST = withErrorHandler(async request => {
  const formData = await request.formData();
  await application(formData);
  return NextResponse.json({ success: true });
});
