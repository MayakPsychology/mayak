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

export const addresses = [
  { fullAddress: 'вул. Тестова 1', district: UUID, nameOfClinic: null, isPrimary: true },
];

export const supportFocuses = [
  {
    therapy: { id: UUID, title: 'КПТ' },
    price: 500,
    requestsIds: [UUID],
    requestsNames: ['Тривога'],
  },
];

export const clients = {
  workingWith: [UUID],
  notWorkingWith: [],
  workingWithNames: ['Військові'],
};

export const specialistApplication = {
  firstName: 'Іван',
  lastName: 'Петренко',
  surname: null,
  yearsOfExperience: 5,
  gender: 'MALE',
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
  supportFocuses,
};

export const organizationApplication = {
  name: 'Центр Маяк',
  type: [UUID],
  typeNames: ['Центр'],
  ownershipType: 'PRIVATE',
  yearsOnMarket: 7,
  yearsOfExperience: 4,
  isInclusiveSpace: true,
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
  supportFocuses,
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
};
