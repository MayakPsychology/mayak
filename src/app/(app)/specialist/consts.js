export const specialistSelect = {
  id: true,
  firstName: true,
  lastName: true,
  surname: true,
  gender: true,
  yearsOfExperience: true,
  formatOfWork: true,
  isFreeReception: true,
  description: true,
  phone: true,
  email: true,
  website: true,
  instagram: true,
  facebook: true,
  youtube: true,
  linkedin: true,
  tiktok: true,
  viber: true,
  telegram: true,
  isActive: true,
  specializations: {
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  },
  supportFocuses: {
    select: {
      id: true,
      price: true,
      therapy: {
        select: { id: true, type: true, title: true, description: true },
      },
      requests: {
        select: { id: true, name: true, simpleId: true },
      },
    },
  },
  workTime: {
    select: {
      id: true,
      weekDay: true,
      time: true,
      isDayOff: true,
    },
  },
  addresses: {
    select: {
      id: true,
      nameOfClinic: true,
      fullAddress: true,
      latitude: true,
      longitude: true,
      isPrimary: true,
      district: { select: { id: true, name: true } },
    },
  },
  clientsWorkingWith: {
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  },
  clientsNotWorkingWith: {
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  },
  specializationMethods: {
    select: { id: true, simpleId: true, title: true, description: true },
  },
};

export const organizationSelect = {
  id: true,
  name: true,
  yearsOnMarket: true,
  formatOfWork: true,
  ownershipType: true,
  isInclusiveSpace: true,
  isFreeReception: true,
  description: true,
  phone: true,
  email: true,
  website: true,
  instagram: true,
  facebook: true,
  youtube: true,
  linkedin: true,
  tiktok: true,
  viber: true,
  telegram: true,
  isActive: true,
  type: {
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  },
  expertSpecializations: {
    select: { id: true, name: true },
  },
  supportFocuses: {
    select: {
      id: true,
      price: true,
      therapy: {
        select: { id: true, type: true, title: true, description: true },
      },
      requests: {
        select: { id: true, name: true, simpleId: true },
      },
    },
  },
  addresses: {
    select: {
      id: true,
      nameOfClinic: true,
      fullAddress: true,
      latitude: true,
      longitude: true,
      isPrimary: true,
      district: { select: { id: true, name: true } },
    },
  },
  workTime: {
    select: {
      id: true,
      weekDay: true,
      time: true,
      isDayOff: true,
    },
  },
  clientsWorkingWith: {
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  },
  clientsNotWorkingWith: {
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  },
};
