import { NextResponse } from 'next/server';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { submitSpecialistApplication } from '@/services/specialist/submitSpecialistApplication';

export const POST = withErrorHandler(async request => {
  const formData = await request.formData();
  await submitSpecialistApplication(formData);
  return NextResponse.json({ success: true });
});
