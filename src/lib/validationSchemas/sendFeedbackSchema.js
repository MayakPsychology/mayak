import { z } from 'zod';
import { PHONE_REGEX } from '../consts';
import { string, boolean } from './utils';

const SendFeedback = z.object({
  name: string('Вкажіть Ваше Імʼя').min(1).max(128).zod,
  phone: string('Мобільний телефон').zod.refine(val => PHONE_REGEX.test(val), {
    message: 'Будь ласка введіть номер у форматі +380XXXXXXXXX',
  }),
  callMe: boolean('Подзвоніть мені').zod,
  email: string('Email').email().optional().zod,
  message: string('Повідомлення').min(5).max(320).zod,
});

export default SendFeedback;
