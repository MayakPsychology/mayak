import { FormatOfWork } from '@prisma/client';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';

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

function safeParse(param) {
  let res;
  try {
    res = JSON.parse(param);
  } catch (e) {
    res = undefined;
  }
  return Number.isInteger(res) || Array.isArray(res) ? res : undefined;
}

export function createEntityFilter({ type, requests, format, districts, prices, query, searchType }) {
  const priceFilter = prices && getPriceFilter(prices);

  const requestTypes = safeParse(requests);
  const supportFocusesFilter = requestTypes || type || priceFilter || query ? true : undefined;

  return {
    isActive: true,
    supportFocuses: supportFocusesFilter && {
      every: prices?.includes('notSpecified') ? { price: { equals: null } } : undefined,
      some: {
        AND: {
          therapy: type && {
            type,
          },
          requests: (searchType === 'request' || requestTypes) && {
            some: {
              name: searchType === 'request' && query && { contains: query, mode: 'insensitive' },
              simpleId: requestTypes && { in: requestTypes },
            },
          },
          OR: priceFilter,
        },
      },
    },
    formatOfWork: format && { in: [FormatOfWork.BOTH, format] },
    addresses: districts && {
      some: {
        OR: districts.map(id => ({
          districtId: id,
        })),
      },
    },
  };
}

export function createSpecialistFilter(queryParams) {
  const sharedWhere = createEntityFilter(queryParams);
  const { specializations, specializationMethods } = queryParams;

  const methods = safeParse(specializationMethods);

  return {
    ...sharedWhere,
    specializations: specializations && {
      some: { id: { in: specializations } },
    },
    specializationMethods: methods && {
      some: { simpleId: { in: methods } },
    },
  };
}

export function createOrganizationFilter(queryParams) {
  const sharedWhere = createEntityFilter(queryParams);
  const { specializations } = queryParams;
  return {
    ...sharedWhere,
    expertSpecializations: specializations && {
      some: { id: { in: specializations } },
    },
  };
}

export function createSearchEntryFilter(queryParams) {
  const { query, searchType } = queryParams;
  const specialistWhere = createSpecialistFilter(queryParams);
  const organizationWhere = createOrganizationFilter(queryParams);

  const defaultFilter = { OR: [{ specialist: specialistWhere }, { organization: organizationWhere }] };

  if (!query) {
    return defaultFilter;
  }
  switch (searchType) {
    case 'request': {
      return defaultFilter;
    }

    case 'specialist':
      return {
        sortString: {
          contains: query,
          mode: 'insensitive',
        },
        specialist: specialistWhere,
      };
    case 'organization':
      return {
        sortString: {
          contains: query,
          mode: 'insensitive',
        },
        organization: organizationWhere,
      };
    default:
      return defaultFilter;
  }
}

export function createSearchSyncFilter(params) {
  const { query, searchType } = params;

  const activeFilter = { isActive: true };
  const defaultFilter = { OR: [{ specialist: activeFilter }, { organization: activeFilter }] };

  if (!query) {
    return defaultFilter;
  }

  switch (searchType) {
    case 'request':
      Object.assign(activeFilter, {
        ...activeFilter,
        supportFocuses: {
          some: {
            requests: {
              some: {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
      });
      return defaultFilter;
    case 'specialist':
      return {
        sortString: {
          contains: query,
          mode: 'insensitive',
        },
        specialist: activeFilter,
      };
    case 'organization':
      return {
        sortString: {
          contains: query,
          mode: 'insensitive',
        },
        organization: activeFilter,
      };
    default:
      return defaultFilter;
  }
}

export function getSearchFilterQueryParams(req) {
  return getSearchParamsFromRequest(
    req,
    {
      format: undefined,
      type: undefined,
      specializations: undefined,
      take: 5,
      skip: 0,
      searchSync: false,
      searchType: undefined,
      query: undefined,
      districts: undefined,
      requests: undefined,
      price: undefined,
    },
    params => ({
      ...params,
      districts: typeof params.district === 'string' ? [params.district] : params.district,
      district: undefined,
      requests: typeof params.request === 'string' ? [params.request] : params.request,
      request: undefined,
      specializations: typeof params.specialization === 'string' ? [params.specialization] : params.specialization,
      specialization: undefined,
      prices: typeof params.price === 'string' ? [params.price] : params.price,
      price: typeof params.price === 'string' ? [params.price] : params.price,
    }),
  );
}
