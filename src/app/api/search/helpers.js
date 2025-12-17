import { FormatOfWork, Gender } from '@prisma/client';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';

function parseDynamicPriceRange(price) {
  const match = price.match(/from(\d+)to(\d+)/);
  if (!match) return null;
  const gteFilter = { price: { gte: parseInt(match[1], 10) } };
  const ltFilter = { price: { lt: parseInt(match[2], 10) } };
  return { AND: [gteFilter, ltFilter] };
}

function getPriceFilter(prices, priceMin, priceMax) {
  if (priceMin && priceMax) {
    const priceBounds = `from${priceMin}to${priceMax}`;
    if (Array.isArray(prices)) {
      prices.push(priceBounds);
    } else {
      // eslint-disable-next-line no-param-reassign
      prices = prices ? [prices, priceBounds] : [priceBounds];
    }
  }
  const priceConditions = {
    notSpecified: { price: { equals: null } },
    free: { price: { equals: 0 } },
    below500: { AND: [{ price: { gt: 0 } }, { price: { lt: 500 } }] },
    above1500: { price: { gte: 1500 } },
  };

  return prices.map(price => priceConditions[price] || parseDynamicPriceRange(price)).filter(price => price);
}

function getFormatFilter(format) {
  const formats = Array.isArray(format) ? format : [format];
  return formats.reduce(
    (acc, val) => {
      if (FormatOfWork[val.toUpperCase()]) {
        acc.push(FormatOfWork[val.toUpperCase()]);
      }
      return acc;
    },
    [FormatOfWork.BOTH],
  );
}

function parseNumericParam(param) {
  let res;
  if (Array.isArray(param)) {
    res = param.map(val => parseInt(val, 10)).filter(val => Number.isInteger(val));
    if (!res.length) {
      res = undefined;
    }
  } else {
    res = Number.isInteger(parseInt(param, 10)) ? [parseInt(param, 10)] : undefined;
  }
  return res;
}

export function createEntityFilter({
  type,
  requests,
  format,
  districts,
  prices,
  priceMin,
  priceMax,
  query,
  searchType,
  category,
}) {
  const priceFilter = (prices || (priceMin && priceMax)) && getPriceFilter(prices, priceMin, priceMax);
  const therapyFilter = type && { type };
  const requestType = parseNumericParam(requests);

  const requestFilter = (searchType === 'request' || requestType) && {
    some: {
      name: searchType === 'request' && query ? { contains: query, mode: 'insensitive' } : undefined,
      simpleId: requestType && { in: requestType },
    },
  };
  const formatOfWorkFilter = format && { in: getFormatFilter(format) };
  const addressesFilter = districts && {
    some: {
      OR: districts.map(id => ({
        districtId: id,
      })),
    },
  };
  const isSupportFocusesFilterExist = requestType || type || priceFilter || query || undefined;
  const supportFocusesFilter = isSupportFocusesFilterExist && {
    some: {
      AND: {
        therapy: therapyFilter,
        requests: requestFilter,
        OR: priceFilter,
      },
    },
  };

  const categoryFilter = category && {
    some: {
      id: Array.isArray(category) ? { in: category } : category,
    },
  };

  return {
    isActive: true,
    supportFocuses: supportFocusesFilter,
    formatOfWork: formatOfWorkFilter,
    addresses: addressesFilter,
    clientsWorkingWith: categoryFilter,
  };
}

export function createSpecialistFilter(queryParams) {
  const sharedWhere = createEntityFilter(queryParams);
  const { specializations, specializationMethods, gender } = queryParams;
  const methods = parseNumericParam(specializationMethods);

  return {
    ...sharedWhere,
    gender: Gender[(gender || '').toUpperCase()],
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
  const { specializations, organizationType } = queryParams;
  return {
    ...sharedWhere,
    ownershipType: organizationType,
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

  if (!searchType || !query) {
    return defaultFilter;
  }

  const terms = query
    ?.split(',')
    .map(t => t.trim())
    .filter(Boolean);

  switch (searchType) {
    case 'request':
      return defaultFilter;

    case 'specialist':
      if (!terms?.length) {
        return {
          sortString: {
            contains: query,
            mode: 'insensitive',
          },
          specialist: specialistWhere,
        };
      }

      return {
        AND: [
          specialistWhere,
          {
            OR: terms.map(term => ({
              sortString: {
                contains: term,
                mode: 'insensitive',
              },
            })),
          },
        ],
      };

    case 'organization':
      if (!terms?.length) {
        return {
          sortString: {
            contains: query,
            mode: 'insensitive',
          },
          organization: organizationWhere,
        };
      }

      return {
        AND: [
          organizationWhere,
          {
            OR: terms.map(term => ({
              sortString: {
                contains: term,
                mode: 'insensitive',
              },
            })),
          },
        ],
      };

    default:
      return defaultFilter;
  }
}

export function createSearchSyncFilter(params) {
  const { query, searchType } = params;

  const activeFilter = { isActive: true };
  const defaultFilter = {
    OR: [{ specialist: activeFilter }, { organization: activeFilter }],
  };

  if (!query) {
    return defaultFilter;
  }

  const terms = query
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  switch (searchType) {
    case 'request':
      return {
        ...defaultFilter,
        supportFocuses: {
          some: {
            requests: {
              some: {
                OR: terms.map(term => ({
                  name: {
                    contains: term,
                    mode: 'insensitive',
                  },
                })),
              },
            },
          },
        },
      };

    case 'specialist':
      if (!terms.length) {
        return {
          sortString: {
            contains: query,
            mode: 'insensitive',
          },
          specialist: activeFilter,
        };
      }

      return {
        specialist: activeFilter,
        OR: terms.map(term => ({
          sortString: {
            contains: term,
            mode: 'insensitive',
          },
        })),
      };

    case 'organization':
      if (!terms.length) {
        return {
          sortString: {
            contains: query,
            mode: 'insensitive',
          },
          organization: activeFilter,
        };
      }

      return {
        organization: activeFilter,
        OR: terms.map(term => ({
          sortString: {
            contains: term,
            mode: 'insensitive',
          },
        })),
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
      organizationType: undefined,
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
