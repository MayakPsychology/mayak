import { WEEKDAYS_TRANSLATION } from '@/app/(admin)/admin/_lib/consts';

export const UUID = 'd5de9719-10cd-4210-925c-184bc8369fd4';

export const workTime = Object.values(WEEKDAYS_TRANSLATION).map(weekDay => ({
  weekDay,
  time: null,
  isDayOff: true,
}));

export const socialLink = {
  instagram: null,
  facebook: null,
  telegram: null,
  linkedin: null,
  youtube: null,
  tiktok: null,
  viber: null,
};

export const CITY_UUID = 'b2f1a0c4-9d3e-4a71-8f52-2c6d7e18b904';

export const addresses = [
  { fullAddress: 'вул. Тестова 1', city: CITY_UUID, district: UUID, nameOfClinic: null, isPrimary: true },
];

// a town with no districts — the common case outside Lviv and Kyiv
export const addressWithoutDistrict = {
  fullAddress: 'вул. Тестова 2',
  city: CITY_UUID,
  district: null,
  nameOfClinic: null,
  isPrimary: true,
};

export const supportFocuses = [
  {
    therapy: { id: UUID, title: 'КПТ' },
    price: 500,
    requestsIds: [UUID],
    requestsNames: ['Тривога'],
  },
];

export const OTHER_UUID = 'a1c3e5f7-2b4d-4c6e-8a09-1f2e3d4c5b6a';

export const clients = {
  workingWith: [UUID],
  notWorkingWith: [OTHER_UUID],
  workingWithNames: ['Військові'],
  notWorkingWithNames: ['Діти'],
};

export const specialistApplication = {
  firstName: 'Іван',
  lastName: 'Петренко',
  surname: null,
  yearsOfExperience: 5,
  gender: 'MALE',
  experience: 'Працюю з дорослими вже пʼять років.',
  education: 'Диплом магістра психології, сертифікати КПТ.',
  email: null,
  website: null,
  phone: '+380671112233',
  socialLink,
  description: 'Опис спеціаліста для перевірки валідації.',
  formatOfWork: 'OFFLINE',
  addresses,
  workTime,
  clients,
  specializations: [UUID],
  specializationMethods: [UUID],
  specializationAdditionalInfo: [
    {
      specializationId: UUID,
      specialization: 'Психолог',
      methodNames: ['КПТ'],
      methodsOther: null,
      professionalDevelopment: 'Курси та вебінари регулярно.',
      personalTherapy: 'Проходжу особисту терапію.',
      supervisionExperience: 'Регулярні супервізії щомісяця.',
    },
  ],
  isFreeReception: false,
  discounts: 'no',
  discountsOther: null,
  supportFocuses,
  feedback: 'Дякую за платформу!',
  consent: true,
};

export const organizationApplication = {
  name: 'Центр Маяк',
  type: [UUID],
  typeNames: ['Центр'],
  ownershipType: 'PRIVATE',
  yearsOnMarket: 7,
  yearsOfExperience: 4,
  isInclusiveSpace: 'yes',
  experience: 'Команда працює із кризовими станами понад сім років.',
  email: null,
  website: null,
  phone: '+380671112233',
  socialLink,
  description: 'Опис організації для перевірки валідації.',
  formatOfWork: 'BOTH',
  addresses,
  workTime,
  clients,
  expertSpecializations: [UUID],
  expertSpecializationNames: ['Психолог'],
  isFreeReception: false,
  discounts: 'no',
  discountsOther: null,
  supportFocuses,
  specialistSelection: 'Відбираємо за освітою та досвідом супервізій.',
  averageExperience: '5',
  achievements: 'Входимо до національної психологічної асоціації.',
  workMethods: 'КПТ, гештальт, схема-терапія.',
  developmentPolicy: 'no',
  supervisionPolicy: 'no',
  ethicalControl: 'Дотримуємось етичного кодексу асоціації.',
  feedbackCollection: 'Анкети після кожного циклу консультацій.',
  submitterContact: 'Олена Коваль, директорка, olena@example.com',
};

export const eventApplication = {
  title: 'Вебінар про тривогу',
  organizerName: 'Маяк',
  eventDate: '2099-10-01T18:00',
  priceType: 'FIXED_PRICE',
  price: 300,
  format: 'OFFLINE',
  address: 'вул. Тестова 1',
  notes: 'Опис події для перевірки валідації схеми.',
  link: 'https://example.com/event',
  feedback: '',
  consent: true,
};
