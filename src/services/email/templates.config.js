import { EMAIL_TYPES } from '@/app/config/emails';
import SpecialistApplicationTemplate from './templates/SpecialistApplicationTemplate';

export const emailTemplates = {
  [EMAIL_TYPES.SPECIALIST_APPLICATION]: SpecialistApplicationTemplate,
};
