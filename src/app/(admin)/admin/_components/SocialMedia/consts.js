import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';

export const socialMediaUseRedirectParams = {
  successMessage: SUCCESS_NOTIFICATIONS.created,
  redirectPath: `/${RESOURCES.socialMedia}`,
  errorMessage: 'Вибрана соціальна мережа вже існує в базі даних',
};
