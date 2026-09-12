import { EMAIL_TYPES } from '@/app/config/emails';
import SpecialistApplicationTemplate from './templates/SpecialistApplicationTemplate';
import OrganizationApplicationTemplate from './templates/OrganizationApplicationTemplate';
import EventApplicationTemplate from './templates/EventApplicationTemplate';

export const emailTemplates = {
  [EMAIL_TYPES.SPECIALIST_APPLICATION]: SpecialistApplicationTemplate,
  [EMAIL_TYPES.ORGANIZATION_APPLICATION]: OrganizationApplicationTemplate,
  [EMAIL_TYPES.EVENT_APPLICATION]: EventApplicationTemplate,
};
