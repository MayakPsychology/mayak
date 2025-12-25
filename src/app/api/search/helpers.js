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

/* eslint-disable sonarjs/cognitive-complexity */
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
      AND: [
        therapyFilter && { therapy: therapyFilter },
        requestFilter && { requests: requestFilter },
        priceFilter && { OR: priceFilter },
      ].filter(Boolean),
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
/* eslint-enable sonarjs/cognitive-complexity */

export function createSpecialistFilter(queryParams) {
  const { isFree } = queryParams;
  const sharedWhere = createEntityFilter(queryParams);
  const { specializations, specializationMethods, gender } = queryParams;
  const methods = parseNumericParam(specializationMethods);

  return {
    ...sharedWhere,
    ...(isFree === true && { isFreeReception: true }),
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
  const { isFree } = queryParams;
  const sharedWhere = createEntityFilter(queryParams);
  const { specializations, organizationType } = queryParams;
  return {
    ...sharedWhere,
    ...(isFree === true && { isFreeReception: true }),
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

  const defaultFilter = {
    OR: [{ specialist: specialistWhere }, { organization: organizationWhere }],
  };

  if (!query || !searchType) {
    return defaultFilter;
  }

  const terms = query
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  switch (searchType) {
    case 'request': {
      if (!terms.length) return defaultFilter;

      return {
        AND: terms.map(term => ({
          OR: [
            {
              specialist: {
                ...specialistWhere,
                supportFocuses: {
                  some: {
                    requests: {
                      some: {
                        name: {
                          contains: term,
                          mode: 'insensitive',
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              organization: {
                ...organizationWhere,
                supportFocuses: {
                  some: {
                    requests: {
                      some: {
                        name: {
                          contains: term,
                          mode: 'insensitive',
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        })),
      };
    }
    case 'specialist': {
      if (!terms.length) {
        return { specialist: specialistWhere };
      }

      return {
        AND: [
          specialistWhere,
          ...terms.map(term => ({
            sortString: {
              contains: term,
              mode: 'insensitive',
            },
          })),
        ],
      };
    }
    case 'organization': {
      if (!terms.length) {
        return { organization: organizationWhere };
      }

      return {
        AND: [
          organizationWhere,
          ...terms.map(term => ({
            sortString: {
              contains: term,
              mode: 'insensitive',
            },
          })),
        ],
      };
    }

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
      isFree: undefined,
    },
    params => {
      const isFree = params.price === 'free' || (Array.isArray(params.price) && params.price.includes('free'));

      let normalizedPrices;

      if (Array.isArray(params.price)) {
        normalizedPrices = params.price.filter(p => p !== 'free');
      } else if (params.price === 'free') {
        normalizedPrices = undefined;
      } else {
        normalizedPrices = params.price;
      }

      return {
        ...params,

        districts: typeof params.district === 'string' ? [params.district] : params.district,
        district: undefined,

        requests: typeof params.request === 'string' ? [params.request] : params.request,
        request: undefined,

        specializations: typeof params.specialization === 'string' ? [params.specialization] : params.specialization,
        specialization: undefined,

        prices: typeof normalizedPrices === 'string' ? [normalizedPrices] : normalizedPrices,
        price: typeof normalizedPrices === 'string' ? [normalizedPrices] : normalizedPrices,

        isFree: isFree || undefined,
      };
    },
  );
}
