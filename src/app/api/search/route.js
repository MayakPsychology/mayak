import { FormatOfWork } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';
import { prisma } from '@/lib/db';

export async function GET(req) {
  const {
    type,
    // TODO: Uncomment pagination params take and skip when pagination is implemented on the frontend
    // take,
    // skip,
    format,
    district: districts,
  } = getSearchParamsFromRequest(
    req,
    {
      format: undefined,
      type: undefined,
      // take: 10,
      // skip: 0,
      district: undefined,
    },
    params => ({
      ...params,
      take: parseInt(params.take, 10),
      skip: parseInt(params.skip, 10),
      district: typeof params.district === 'string' ? [params.district] : params.district,
    }),
  );
  const whereFilter = {
    AND: {
      supportFocuses: type && {
        some: {
          therapy: {
            type,
          },
        },
      },
      isActive: true,
      OR: format && [{ formatOfWork: FormatOfWork.BOTH }, { formatOfWork: format }],
      addresses: districts && {
        some: {
          OR: districts.map(id => ({
            districtId: id,
          })),
        },
      },
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
          organization: whereFilter,
        },
        {
          specialist: whereFilter,
        },
      ],
    },
  });
  const searchEntries = await prisma.searchEntry.findMany({
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
          organization: whereFilter,
        },
        {
          specialist: whereFilter,
        },
      ],
    },
    orderBy: {
      sortString: 'asc',
    },
    // take,
    // skip,
  });

  const data = searchEntries.map(entry => (entry.specialist ? entry.specialist : entry.organization));

  return NextResponse.json({
    totalCount,
    data,
  });
}
