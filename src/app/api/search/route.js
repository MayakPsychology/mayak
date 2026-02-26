import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { createSearchEntryFilter, getSearchFilterQueryParams } from './helpers';

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);
  const { take, skip, lastCursor } = params;
  const isMapMode = params?.mode === 'map';

  const searchEntryFilter = createSearchEntryFilter(params);

  const [totalCount, searchEntries] = await Promise.all([
    prisma.searchEntry.count({ where: searchEntryFilter }),
    prisma.searchEntry.findMany({
      select: {
        id: true,
        sortString: true,
        specialist: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            surname: true,
            gender: true,
            yearsOfExperience: true,
            formatOfWork: true,
            isFreeReception: true,
            description: true,
            phone: true,
            email: true,
            website: true,
            instagram: true,
            facebook: true,
            youtube: true,
            linkedin: true,
            tiktok: true,
            viber: true,
            telegram: true,
            isActive: true,
            _count: {
              select: {
                supportFocuses: true,
                workTime: true,
              },
            },
            addresses: {
              where: { isPrimary: true },
              take: 1,
              select: {
                id: true,
                nameOfClinic: true,
                fullAddress: true,
                latitude: true,
                longitude: true,
                isPrimary: true,
                district: { select: { id: true, name: true } },
              },
            },
            specializations: {
              take: 3,
              select: { id: true, name: true },
            },
            supportFocuses: {
              select: {
                id: true,
                price: true,
                therapy: {
                  select: {
                    id: true,
                    type: true,
                    title: true,
                    description: true,
                  },
                },
                requests: {
                  select: {
                    id: true,
                    name: true,
                    simpleId: true,
                  },
                },
              },
            },
            specializationMethods: {
              select: { id: true, simpleId: true, title: true, description: true },
            },
            clientsWorkingWith: {
              select: { id: true, name: true },
            },
            clientsNotWorkingWith: {
              select: { id: true, name: true },
            },
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
            yearsOnMarket: true,
            formatOfWork: true,
            ownershipType: true,
            isInclusiveSpace: true,
            isFreeReception: true,
            description: true,
            phone: true,
            email: true,
            website: true,
            instagram: true,
            facebook: true,
            youtube: true,
            linkedin: true,
            tiktok: true,
            viber: true,
            telegram: true,
            isActive: true,
            _count: {
              select: {
                supportFocuses: true,
                workTime: true,
              },
            },
            addresses: {
              where: { isPrimary: true },
              take: 1,
              select: {
                id: true,
                nameOfClinic: true,
                fullAddress: true,
                latitude: true,
                longitude: true,
                isPrimary: true,
                district: { select: { id: true, name: true } },
              },
            },
            type: {
              select: { id: true, name: true },
            },
            expertSpecializations: {
              take: 3,
              select: { id: true, name: true },
            },
            supportFocuses: {
              select: {
                id: true,
                price: true,
                therapy: {
                  select: {
                    id: true,
                    type: true,
                    title: true,
                    description: true,
                  },
                },
                requests: {
                  select: {
                    id: true,
                    name: true,
                    simpleId: true,
                  },
                },
              },
            },
            clientsWorkingWith: {
              select: { id: true, name: true },
            },
            clientsNotWorkingWith: {
              select: { id: true, name: true },
            },
          },
        },
      },
      where: searchEntryFilter,
      orderBy: {
        sortString: 'asc',
      },
      ...(isMapMode ? {} : { take: take + 1 }),
      skip,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: lastCursor,
        },
      }),
    }),
  ]);

  const takeFilter = isMapMode ? totalCount : take;

  let nextPageEntry;
  if (searchEntries.length > takeFilter) {
    nextPageEntry = searchEntries.pop();
  }
  const hasNextPage = !!nextPageEntry;

  const newCursor = hasNextPage ? searchEntries[take - 1].id : undefined;
  return NextResponse.json({
    data: searchEntries,
    metaData: {
      totalCount,
      lastCursor: newCursor,
      hasNextPage,
    },
  });
});

export { handler as GET };
