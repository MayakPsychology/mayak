import { WEEKDAYS_TRANSLATION } from '@/app/(admin)/admin/_lib/consts';

const weekDays = Object.values(WEEKDAYS_TRANSLATION);

export const organizationDefaultValues = {
  name: '',
  type: [],
  typeNames: [],
  ownershipType: null,
  yearsOnMarket: null,
  yearsOfExperience: null,
  isInclusiveSpace: false,
  formatOfWork: null,
  phone: null,
  email: null,
  website: null,
  addresses: [],
  isFreeReception: false,
  workTime: weekDays.map(weekDay => ({
    weekDay,
    time: null,
    isDayOff: true,
  })),
  socialLink: {
    instagram: null,
    facebook: null,
    telegram: null,
    linkedin: null,
    youtube: null,
    tiktok: null,
    viber: null,
  },
  description: null,
  clients: {
    workingWith: [],
    notWorkingWith: [],
  },
  expertSpecializations: [],
  expertSpecializationNames: [],
  supportFocuses: [],
};
