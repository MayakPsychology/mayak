import { specialistTypeEnum } from '@components/Specialists/Filters/utils';

export const SEARCH_DEBOUNCE_TIME_MS = 600;
export const SEARCH_MIN_QUERY_LENGTH = 3;
export const SEARCH_AUTO_COMPLETE_MAX_COUNT = 5;

const DEFAULT_SEARCH_TYPE_CONFIG = {
  id: 1,
  searchType: specialistTypeEnum.REQUEST,
  title: 'Запит',
  placeholder: 'Введіть назву запиту',
};

export const searchInputTypeConfigs = [
  DEFAULT_SEARCH_TYPE_CONFIG,
  {
    id: 2,
    searchType: specialistTypeEnum.SPECIALIST,
    title: 'Спеціаліст',
    placeholder: 'Введіть ПІБ спеціаліста',
  },
  {
    id: 3,
    searchType: specialistTypeEnum.ORGANIZATION,
    title: 'Організація',
    placeholder: 'Введіть назву організації',
  },
];

export function getSearchTypeConfig(searchType) {
  return searchInputTypeConfigs.find(config => config.searchType === searchType) || DEFAULT_SEARCH_TYPE_CONFIG;
}
