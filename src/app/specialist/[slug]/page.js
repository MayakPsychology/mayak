import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const metadata = {
  title: 'Спеціаліст',
  description: '...',
};

export default async function Page({ params }) {
  const { slug: id } = params;
  const specialist = await prisma.specialist.findUnique({ where: { id } });
  return (
    <div className="m-5">
      <Link href={'/specialist'} className="bg-gray-500 p-2">
        Back
      </Link>
      <pre className="m-5">{JSON.stringify(specialist, null, 4)}</pre>
    </div>
  );
}
