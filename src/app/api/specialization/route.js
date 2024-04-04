import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const specializations = await prisma.specialization.findMany();
  return NextResponse.json(specializations);
}
