import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const clientCategories = await prisma.clientCategory.findMany();
  return NextResponse.json(clientCategories);
}
