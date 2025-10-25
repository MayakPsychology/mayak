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

function getFocusesToDelete(focuses, focusesIds = []) {
  return toConnectList(focusesIds.filter(cutId => !focuses?.some(focus => focus.id === cutId) ?? true));
}

function buildFocusUpdate(focus) {
  const requestsConnect = toConnectList(focus.requestsIds);
  const hasRequests = Array.isArray(requestsConnect) && requestsConnect.length > 0;

  return {
    where: { id: focus.id },
    data: {
      price: focus.price,
      therapy: { connect: { id: focus.therapy.id } },
      ...(hasRequests && { requests: { set: [], connect: requestsConnect } }),
    },
  };
}

function buildFocusCreate(focus) {
  const requestsConnect = toConnectList(focus.requestsIds);
  const hasRequests = Array.isArray(requestsConnect) && requestsConnect.length > 0;

  return {
    price: focus.price,
    therapy: { connect: { id: focus.therapy.id } },
    ...(hasRequests && { requests: { connect: requestsConnect } }),
  };
}

export const transformSupportFocuses = ({ focuses, focusesIds }) => {
  const focusesToUpdate = [];
  const focusesToCreate = [];

  const focusesToDelete = getFocusesToDelete(focuses, focusesIds);

  focuses?.forEach(focus => {
    if (focus.id) {
      focusesToUpdate.push(buildFocusUpdate(focus));
    } else {
      focusesToCreate.push(buildFocusCreate(focus));
    }
  });

  return {
    update: focusesToUpdate.length ? focusesToUpdate : undefined,
    deleteMany: focusesToDelete.length ? focusesToDelete : undefined,
    create: focusesToCreate.length ? focusesToCreate : undefined,
  };
};

export const transformCreateData = ({ addresses, supportFocuses, socialLink, workTime, clients = {}, ...rest }) => {
  const { workingWith, notWorkingWith } = clients;
  return {
    ...rest,
    ...socialLink,
    clientsWorkingWith: {
      connect: toConnectList(workingWith),
    },
    clientsNotWorkingWith: {
      connect: toConnectList(notWorkingWith),
    },
    addresses: {
      create: transformAddresses({ addresses, type: 'create' }),
    },
    supportFocuses: transformSupportFocuses({ focuses: supportFocuses, focusesIds: [] }),
    workTime: {
      connectOrCreate: workTime?.length ? transformWorkTime(workTime) : undefined,
    },
  };
};

export const transformEditData = ({
  addresses,
  addressesIds,
  supportFocuses,
  supportFocusesIds,
  formatOfWork,
  socialLink,
  workTime,
  clients = { workingWith: [], notWorkingWith: [] },
  ...rest
}) => {
  const addressesToConnect = toConnectList(addresses?.filter(address => address.id));
  const addressesToCreate = transformAddresses({ addresses, type: 'edit' });

  const unselectedAddresses = addressesIds?.filter(
    addressId => !addressesToConnect.some(address => address.id === addressId),
  );

  const addressesToDelete = formatOfWork !== FormatOfWork.ONLINE ? toConnectList(unselectedAddresses) : [];

  return {
    ...rest,
    ...socialLink,
    formatOfWork,
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
    clientsWorkingWith: {
      set: [],
      connect: toConnectList(clients.workingWith),
    },
    clientsNotWorkingWith: {
      set: [],
      connect: toConnectList(clients.notWorkingWith),
    },
  };
};
