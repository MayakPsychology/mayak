import { FormatOfWork } from '@prisma/client';
import { WEEKDAYS_TRANSLATION } from '@admin/_lib/consts';

export const capitalize = inputString => inputString.charAt(0).toUpperCase() + inputString.slice(1);

export const getChoicesList = (list, translations) =>
  list.map(item => ({
    id: item,
    name: capitalize(translations[item.toLowerCase()]) ?? item,
  }));

export function toConnectList(list, cb) {
  return list?.map(id => ({ id: cb?.(id) ?? id })) ?? [];
}

export function isSpecifiedWorkTime(workTime) {
  return workTime.some(day => day.isDayOff === false || day.isDayOff || day.time);
}

export function transformWorkTime(workTime) {
  if (!isSpecifiedWorkTime(workTime)) return [];
  return workTime.map(day => {
    const { weekDay, time, isDayOff } = day;
    const workTimeObj = {
      weekDay: Object.keys(WEEKDAYS_TRANSLATION).find(key => WEEKDAYS_TRANSLATION[key] === weekDay),
      isDayOff: !!isDayOff, // convert to false if it's null/undefined
      time: time || '',
    };
    return {
      create: workTimeObj,
      where: { weekDay_time_isDayOff: workTimeObj },
    };
  });
}

function transformAddresses({ addresses, type = 'create' }) {
  return (
    addresses
      ?.filter(address => !address.id)
      .map(({ district, districtId, ...rest }) => ({
        ...rest,
        district: { connect: { id: type === 'create' ? district : districtId } },
        districtId: undefined,
      })) ?? []
  );
}

export const transformSupportFocuses = ({ focuses, focusesIds }) => {
  const focusesToUpdate = [];
  const focusesToCreate = [];

  const focusesToDelete = toConnectList(
    focusesIds.filter(cutId => !focuses?.some(focus => focus.id === cutId) ?? true),
  );

  focuses?.forEach(focus => {
    if (focus.id) {
      focusesToUpdate.push({
        where: { id: focus.id },
        data: {
          price: focus.price,
          therapy: { connect: { id: focus.therapy.id } },
          requests: { set: [], connect: toConnectList(focus.requestsIds) },
        },
      });
    } else {
      focusesToCreate.push({
        price: focus.price,
        therapy: { connect: { id: focus.therapy.id } },
        requests: { connect: toConnectList(focus.requestsIds) },
      });
    }
  });

  return {
    update: focusesToUpdate.length ? focusesToUpdate : undefined,
    deleteMany: focusesToDelete.length ? focusesToDelete : undefined,
    create: focusesToCreate.length ? focusesToCreate : undefined,
  };
};

export const transformCreateData = ({
  addresses,
  supportFocuses,
  socialLink,
  workTime,
  workingWith,
  notWorkingWith,
  ...rest
}) => ({
  ...rest,
  ...socialLink,
  clientsWorkingWith: {
    connect: workingWith?.length ? toConnectList(workingWith) : undefined,
  },
  clientsNotWorkingWith: {
    connect: notWorkingWith?.length ? toConnectList(notWorkingWith) : undefined,
  },
  addresses: {
    create: addresses?.length ? transformAddresses({ addresses, type: 'create' }) : undefined,
  },
  supportFocuses: transformSupportFocuses({ focuses: supportFocuses, focusesIds: [] }),
  workTime: { connectOrCreate: workTime?.length ? transformWorkTime(workTime) : undefined },
});

export const transformEditData = ({
  addresses,
  addressesIds,
  supportFocuses,
  supportFocusesIds,
  formatOfWork,
  socialLink,
  workTime,
  ...rest
}) => {
  const addressesToConnect = toConnectList(
    addresses?.filter(address => address.id),
    address => address.id,
  );
  const addressesToCreate = transformAddresses({ addresses, type: 'edit' });

  const unselectedAddresses =
    addressesIds?.filter(addressId => !addressesToConnect.some(address => address.id === addressId)) ?? [];
  // if formatOfWork is ONLINE, we need to delete all connected addresses
  const addressesToDelete = formatOfWork !== FormatOfWork.ONLINE ? toConnectList(unselectedAddresses) : {};
  return {
    ...rest,
    ...socialLink,
    formatOfWork,
    supportFocusesIds: undefined,
    addressesIds: undefined,
    workTime: {
      set: [],
      connectOrCreate: transformWorkTime(workTime),
    },
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
    supportFocuses: transformSupportFocuses({ focuses: supportFocuses, focusesIds: supportFocusesIds }),
  };
};
