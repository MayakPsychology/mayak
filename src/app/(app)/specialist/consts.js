export const specialistInclude = {
  specializations: {
    orderBy: {
      name: 'asc',
    },
  },
  supportFocuses: {
    include: {
      therapy: true,
    },
  },
  workTime: true,
  addresses: {
    include: {
      district: true,
    },
  },
  specializationMethods: { select: { id: true, title: true, description: true } },
};

export const organizationInclude = {
  type: {
    orderBy: {
      name: 'asc',
    },
  },
  supportFocuses: {
    include: {
      therapy: true,
    },
  },
  addresses: {
    include: {
      district: true,
    },
  },
  workTime: true,
};
