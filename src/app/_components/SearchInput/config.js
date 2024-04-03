export const SEARCH_DEBOUNCE_TIME_MS = 600;
export const SEARCH_MIN_QUERY_LENGTH = 3;
export const SEARCH_AUTO_COMPLETE_MAX_COUNT = 5;

export const searchInputTypeEnum = {
  REQUEST: 'request',
  SPECIALIST: 'specialist',
  ORGANIZATION: 'organization',
};

const DEFAULT_SEARCH_TYPE_CONFIG = {
  id: 1,
  searchType: searchInputTypeEnum.REQUEST,
  title: 'Запит',
  placeholder: 'Введіть назву запиту',
};

export const searchInputTypeConfigs = [
  DEFAULT_SEARCH_TYPE_CONFIG,
  {
    id: 2,
    searchType: searchInputTypeEnum.SPECIALIST,
    title: 'Спеціаліст',
    placeholder: 'Введіть ПІБ спеціаліста',
  },
  {
    id: 3,
    searchType: searchInputTypeEnum.ORGANIZATION,
    title: 'Організація',
    placeholder: 'Введіть назву організації',
  },
];

export function getSearchTypeConfig(searchType) {
  return searchInputTypeConfigs.find(config => config.searchType === searchType) || DEFAULT_SEARCH_TYPE_CONFIG;
}
