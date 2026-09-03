import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { formDataToObject } from '@/lib/formData';
import { assertWithinRateLimit } from '@/lib/rateLimit';
import { application } from '@/services/event';

export const GET = withErrorHandler(async req => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const url = new URL(req.url);
  const take = url.searchParams.get('take');
  const lastCursor = url.searchParams.get('lastCursor');
  const queryMonth = url.searchParams.get('month');

  const filteredQueryMonth = queryMonth ? parseInt(queryMonth, 10) : currentMonth;
  const startOfNextMonth = new Date(currentYear, filteredQueryMonth, 1);
  const endOfMonth = new Date(currentYear, filteredQueryMonth, 0); // останній день поточного місяця
  const endOfNextMonth = new Date(currentYear, filteredQueryMonth, 0); // останній день наступного місяця

  const result = await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      eventDate: true,
      format: true,
      isActive: true,
      organizerName: true,
      notes: true,
      address: true,
      locationLink: true,
      price: true,
      priceType: true,
      tags: {
        select: { id: true, name: true },
      },
      additionalLink: {
        select: { id: true, label: true, link: true },
      },
    },
    where: {
      isActive: true,
      eventDate: {
        gte: filteredQueryMonth === currentMonth ? today : startOfNextMonth,
        lte: filteredQueryMonth === currentMonth ? endOfMonth : endOfNextMonth,
      },
    },
    take: take ? parseInt(take, 10) : 6,
    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: lastCursor,
      },
    }),
    orderBy: {
      eventDate: 'asc',
    },
  });

  if (result.length === 0) {
    return new Response(
      JSON.stringify({
        data: [],
        metaData: {
          lastCursor: null,
          hasNextPage: false,
          queryMonth,
        },
      }),
      { status: 200 },
    );
  }

  const hasNextPage = result.length === (take ? parseInt(take, 10) : 6);
  const data = {
    data: result,
    metaData: {
      lastCursor: result.length ? result[result.length - 1].id : null,
      hasNextPage,
      queryMonth,
    },
  };

  return new Response(JSON.stringify(data), { status: 200 });
});

export const POST = withErrorHandler(async request => {
  assertWithinRateLimit(request, 'event-application');

  const formData = await request.formData();
  const { id } = await application(formDataToObject(formData));

  return NextResponse.json({ success: true, id }, { status: 201 });
});
