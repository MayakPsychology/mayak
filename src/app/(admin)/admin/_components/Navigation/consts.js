import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';

export const socialMediaUseRedirectParams = {
  successMessage: SUCCESS_NOTIFICATIONS.created,
  redirectPath: `/${RESOURCES.navigation}`,
  errorMessage: 'Вибране посилання вже існує в базі даних',
};
