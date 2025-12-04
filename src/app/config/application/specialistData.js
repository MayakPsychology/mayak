const { WEEKDAYS_TRANSLATION } = require('@/app/(admin)/admin/_lib/consts');

const weekDays = Object.values(WEEKDAYS_TRANSLATION);
export const specialistDefaultValues = {
  firstName: '',
  lastName: '',
  surname: '',
  yearsOfExperience: null,
  gender: null,
  formatOfWork: null, // вказати за замувочуванням
  phone: null,
  email: null,
  website: null,
  addresses: [
    {
      isPrimary: false,
      fullAddress: null,
      nameOfClinic: null,
      district: [],
    },
  ],
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
  specializations: [],
  specializationMethods: [],
  supportFocuses: [
    {
      therapy: {},
      requestsIds: [],
      price: 0,
    },
  ],
};
