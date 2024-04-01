import { FormatOfWork } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';
import { prisma } from '@/lib/db';

function parseDynamicPriceRange(price) {
  const match = price.match(/from(\d+)to(\d+)/);
  if (!match) return null;
  const gteFilter = { price: { gte: parseInt(match[1], 10) } };
  const ltFilter = { price: { lt: parseInt(match[2], 10) } };
  return { AND: [gteFilter, ltFilter] };
}

function getPriceFilter(prices) {
  const priceConditions = {
    free: { price: { equals: 0 } },
    below500: { AND: [{ price: { gt: 0 } }, { price: { lt: 500 } }] },
    above1500: { price: { gte: 1500 } },
  };

  return prices.map(price => priceConditions[price] || parseDynamicPriceRange(price)).filter(price => price);
}

export async function GET(req) {
  const {
    type,
    take,
    skip,
    lastCursor,
    format,
    district: districts,
    specialization: specializations,
    price,
  } = getSearchParamsFromRequest(
    req,
    {
      format: undefined,
      type: undefined,
      specialization: undefined,
      take: 5,
      skip: 0,
      district: undefined,
      price: undefined,
    },
    params => ({
      ...params,
      take: parseInt(params.take, 10),
      skip: parseInt(params.skip, 10),
      district: typeof params.district === 'string' ? [params.district] : params.district,
      specialization: typeof params.specialization === 'string' ? [params.specialization] : params.specialization,
      price: typeof params.price === 'string' ? [params.price] : params.price,
    }),
  );

  const priceFilter = price && getPriceFilter(price);

  const specializationIds = specializations && {
    some: { OR: specializations.map(id => ({ id })) },
  };

  const supportFocusesWhere = [
    {
      supportFocuses: {
        some: {
          therapy: type && {
            type,
          },
          OR: priceFilter,
        },
      },
    },
    { supportFocuses: { every: price?.includes('notSpecified') ? { price: { equals: null } } : undefined } },
  ];

  const sharedWhere = {
    isActive: true,
    OR: supportFocusesWhere,
    formatOfWork: format && { in: [FormatOfWork.BOTH, format] },
    addresses: districts && {
      some: {
        OR: districts.map(id => ({
          districtId: id,
        })),
      },
    },
  };

  const specialistWhere = {
    AND: {
      ...sharedWhere,
      specializations: specializationIds,
    },
  };

  const organizationWhere = {
    AND: {
      ...sharedWhere,
      expertSpecializations: specializationIds,
    },
  };

  const sharedInclude = {
    supportFocuses: {
      select: {
        id: true,
        price: true,
        therapy: true,
        requests: true,
      },
    },
    addresses: {
      select: {
        id: true,
        nameOfClinic: true,
        fullAddress: true,
        latitude: true,
        longitude: true,
        district: { select: { id: true, name: true } },
        isPrimary: true,
      },
    },
    workTime: {
      select: {
        weekDay: true,
        time: true,
        isDayOff: true,
      },
    },
  };

  const totalCount = await prisma.searchEntry.count({
    where: {
      OR: [
        {
          organization: organizationWhere,
        },
        {
          specialist: specialistWhere,
        },
      ],
    },
  });

  const searchEntriesPlusOneExtra = await prisma.searchEntry.findMany({
    include: {
      specialist: {
        include: {
          ...sharedInclude,
          specializationMethods: { select: { id: true, title: true, description: true } },
          specializations: { select: { id: true, name: true } },
        },
      },
      organization: {
        include: {
          ...sharedInclude,
          type: { select: { id: true, name: true } },
          expertSpecializations: {
            select: { id: true, name: true },
          },
        },
      },
    },
    where: {
      OR: [
        {
          organization: organizationWhere,
        },
        {
          specialist: specialistWhere,
        },
      ],
    },
    orderBy: {
      sortString: 'asc',
    },
    // take one more, to see if there next page available
    take: take + 1,
    skip,
    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: lastCursor,
      },
    }),
  });
  // take last one
  const isNextPageExist = searchEntriesPlusOneExtra.length === take + 1;
  // take rest ( page requested )
  const results = searchEntriesPlusOneExtra.slice(0, -1);
  const lastResult = results.slice(-1)[0];
  const newCursor = lastResult?.id;

  return NextResponse.json({
    data: results,
    metaData: {
      totalCount,
      lastCursor: newCursor,
      hasNextPage: isNextPageExist,
    },
  });
}
