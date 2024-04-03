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

  const filteredQueryMonth = parseInt(queryMonth, 10);
  const startOfNextMonth = new Date(currentYear, filteredQueryMonth - 1, 1);
  const endOfMonth = new Date(currentYear, filteredQueryMonth, 1);
  const endOfNextMonth = new Date(currentYear, filteredQueryMonth, 1);

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

  const lastPostInResults = result[result.length - 1];
  const cursor = lastPostInResults.id;

  const nextPage = await prisma.event.findMany({
    take: take ? parseInt(take, 10) : 6,
    skip: 1,
    cursor: {
      id: cursor,
    },
    orderBy: {
      eventDate: 'asc',
    },
  });

  const data = {
    data: result,
    metaData: {
      lastCursor: cursor,
      hasNextPage: nextPage.length > 0,
      queryMonth,
    },
  };

  return new Response(JSON.stringify(data), { status: 200 });
});
