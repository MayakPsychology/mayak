const { WEEKDAYS_TRANSLATION } = require('@/app/(admin)/admin/_lib/consts');

const weekDaysArray = Object.entries(WEEKDAYS_TRANSLATION);
export const specialistDefaultValues = {
  firstName: '',
  lastName: '',
  secondName: '',
  gender: '',
  formatOfWork: '',
  phone: '',
  email: '',
  website: '',
  addresses: [
    {
      isPrimary: false,
      fullAddress: '',
      nameOfClinic: '',
      districtId: [],
    },
  ],
  yearsOfExperience: '',
  isFreeReception: false,
  workTime: weekDaysArray.map(([value]) => ({
    weekDay: value,
    time: '',
    isDayOff: true,
  })),
  socialLinks: {
    instagram: '',
    facebook: '',
    telegram: '',
    youtube: '',
    tiktok: '',
  },
  description: '',
  clientsWorkingWith: [],
  clientsWorkingWithAdditional: '',
  clientsNotWorkingWith: [],
  clientsNotWorkingWithAdditional: '',
  specializations: [],
  specializationMethods: [],
};
