import { z } from 'zod';

export const specialistTypeEnum = {
  REQUEST: 'request',
  SPECIALIST: 'specialist',
  ORGANIZATION: 'organization',
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
      { value: 'ONLINE', label: 'Онлайн' },
      { value: 'OFFLINE', label: 'Офлайн' },
      { value: 'BOTH', label: 'Змішаний' },
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

export const countAppliedFilters = (keys, searchParams) =>
  keys.reduce((acc, filterKey) => {
    const filterCount =
      typeof filterKey === 'object'
        ? countAppliedFilters(Object.keys(filterKey), searchParams)
        : searchParams.getAll(filterKey).length;

    return filterCount + acc;
  }, 0);
