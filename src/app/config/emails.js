export const EMAIL_TYPES = {
  SPECIALIST_APPLICATION: 'specialistApplication',
  ORGANIZATION_APPLICATION: 'organizationApplication',
  EVENT_APPLICATION: 'eventApplication',
};

export const APPLICATION_SENDER = 'Заявки Маяк <noreply@notify.mayak.co.ua>';

export const EMAIL_SUBJECT_PREFIX = {
  [EMAIL_TYPES.SPECIALIST_APPLICATION]: 'Нова заявка спеціаліста',
  [EMAIL_TYPES.ORGANIZATION_APPLICATION]: 'Нова заявка організації',
  [EMAIL_TYPES.EVENT_APPLICATION]: 'Нова заявка події',
};
