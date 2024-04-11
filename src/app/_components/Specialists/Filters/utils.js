import { z } from 'zod';

// @TODO add more types
export const priceTypeEnum = {
  FREE: 'free',
};
export const specialistTypeEnum = {
  REQUEST: 'request',
  SPECIALIST: 'specialist',
  ORGANIZATION: 'organization',
};

export const specialistFormatEnum = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  BOTH: 'BOTH',
};

export const specialistFiltersConfig = {
  specialistType: {
    title: 'Тип спеціаліста',
    filterKey: 'searchType',
    options: [
      { value: specialistTypeEnum.SPECIALIST, label: 'Спеціалісти' },
      { value: specialistTypeEnum.ORGANIZATION, label: 'Організації' },
    ],
  },
  type: {
    title: 'Тип консультації / терапії',
    filterKey: 'type',
  },
  specialization: {
    title: 'Посада',
    filterKey: 'specialization',
  },
  request: {
    title: 'Запити',
    filterKey: 'request',
  },
  district: {
    title: 'Райони',
    filterKey: 'district',
  },
  price: {
    title: 'Ціна',
    filterKey: {
      price: 'price',
      priceMin: 'priceMin',
      priceMax: 'priceMax',
    },
  },
  format: {
    title: 'Формат',
    filterKey: 'format',
    options: [
      { value: specialistFormatEnum.ONLINE, label: 'Онлайн' },
      { value: specialistFormatEnum.OFFLINE, label: 'Офлайн' },
      { value: specialistFormatEnum.BOTH, label: 'Змішаний' },
    ],
  },
  gender: {
    title: 'Стать спеціаліста',
    filterKey: 'gender',
    options: [
      {
        label: 'Чоловік',
        value: 'MALE',
      },
      {
        label: 'Жінка',
        value: 'FEMALE',
      },
    ],
  },
  category: {
    title: 'Працює з категоріями',
    filterKey: 'category',
  },
  organizationType: {
    title: 'Тип організації',
    filterKey: 'organizationType',
    options: [
      {
        value: 'GOVERNMENT',
        label: 'Державна',
      },
      {
        value: 'PRIVATE',
        label: 'Приватна',
      },
    ],
  },
};

export function findFirstLetter(string = '') {
  return string.replace(/["']/g, '')[0] || '';
}

export function groupByLetters(items) {
  return items.reduce((acc, item) => {
    const letter = findFirstLetter(item.name).toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(item);
    return acc;
  }, {});
}

export const MIN_PRICE = 1;
export const MAX_PRICE = 10000;

export const isValidRangePrice = price => z.number().gte(MIN_PRICE).lte(MAX_PRICE).safeParse(+price).success;

export const countAppliedFilters = (keys, searchParams, options = {}) =>
  keys.reduce((acc, filterKey) => {
    const filterCount = (() => {
      if (typeof filterKey === 'object') {
        return countAppliedFilters(Object.keys(filterKey), searchParams, options);
      }
      const basicValue = searchParams.getAll(filterKey);
      const value = options.filter ? options.filter(filterKey, basicValue) : basicValue;
      return value.length;
    })();

    return filterCount + acc;
  }, 0);

export const processFiltersBeforeApply = filtersToProcess => {
  const priceKeys = [
    specialistFiltersConfig.price.filterKey.priceMin,
    specialistFiltersConfig.price.filterKey.priceMax,
  ];
  const hasPriceRangeFilter = filtersToProcess.get(priceKeys[0]) || filtersToProcess.get(priceKeys[1]);
  if (hasPriceRangeFilter) {
    filtersToProcess.getAll(specialistFiltersConfig.price.filterKey.price).forEach(value => {
      if (value !== priceTypeEnum.FREE) {
        filtersToProcess.delete(specialistFiltersConfig.price.filterKey.price, value);
      }
    });
  }
  return filtersToProcess;
};

export const getInitialFilters = searchParams => {
  const newSearchParams = new URLSearchParams(searchParams);
  const currentSpecialistType = newSearchParams.get(specialistFiltersConfig.specialistType.filterKey);
  // set default specialist type if it's set to a wrong value
  if (specialistFiltersConfig.specialistType.options.every(option => option.value !== currentSpecialistType)) {
    newSearchParams.set(
      specialistFiltersConfig.specialistType.filterKey,
      specialistFiltersConfig.specialistType.options[0].value,
    );
  }
  return newSearchParams;
};
