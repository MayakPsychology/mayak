import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';

export const GET = withErrorHandler(async () => {
  const data = await prisma.donationDetails.findFirst();
  return NextResponse.json(data);
});
