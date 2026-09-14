export const LOGIN_URL = '/admin#/login';
export const PHONE_REGEX = /^\+?[1-9]\d{0,14}$/;

export const SOCIAL_REGEX = {
  INSTAGRAM: /^(https?:\/\/(www\.)?instagram\.com\/)?[A-Za-z0-9._]{1,30}$/,
  FACEBOOK: /^(https?:\/\/(www\.)?facebook\.com\/)[A-Za-z0-9.\-_/]+$/,
  LINKEDIN: /^(https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+)$/,
  YOUTUBE: /^(https?:\/\/(www\.)?youtube\.com\/(c|channel|@)[A-Za-z0-9._-]+)$/,
  TIKTOK: /^(https?:\/\/(www\.)?tiktok\.com\/@[A-Za-z0-9._-]+)$/,
};

export const MESSENGER_REGEX = {
  TELEGRAM: /^(https?:\/\/t\.me\/)?[a-zA-Z0-9_]{5,32}$/,
  VIBER: /^\+?[1-9]\d{7,14}$/,
  WHATSAPP: /^\+?[1-9]\d{7,14}$/,
};

export const FAQ_PRIORITY_CHANGE_STEP = 1;
export const BASE_ERROR_MESSAGES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  405: 'Method Not Allowed',
  422: 'Unprocessable entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
};
export const INPUT_DEBOUNCE = 500;
