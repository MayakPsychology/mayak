import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';

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
    include: { tags: true, additionalLink: true },
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
