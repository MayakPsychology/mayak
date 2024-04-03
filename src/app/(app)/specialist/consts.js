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
  clientsWorkingWith: {
    orderBy: {
      name: 'asc',
    },
  },
  clientsNotWorkingWith: {
    orderBy: {
      name: 'asc',
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
  expertSpecializations: true,
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
  clientsWorkingWith: {
    orderBy: {
      name: 'asc',
    },
  },
  clientsNotWorkingWith: {
    orderBy: {
      name: 'asc',
    },
  },
};
