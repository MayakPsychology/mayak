import { toConnectList, transformEditData } from './common';

export function transformSpecialistEditData({
  specializationsIds,
  specializationMethodsIds,
  socialLink,
  therapyPricesEdit,
  therapyPrices,
  therapiesIds,
  clients,
  ...rest
}) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const specializationMethodsToConnect = toConnectList([].concat(...Object.values(specializationMethodsIds)));

  const base = transformEditData({ ...rest });

  const clientsWorkingWith = toConnectList(clients.workingWith);
  const clientsNotWorkingWith = toConnectList(clients.notWorkingWith);

  return {
    ...base,
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    specializationMethods: {
      set: [],
      connect: specializationMethodsToConnect,
    },
    specializationMethodsIds: undefined,
    specializationsIds: undefined,
    clientsWorkingWith: {
      set: [],
      connect: clientsWorkingWith,
    },
    clientsWorkingWithIds: undefined,
    clientsNotWorkingWith: {
      set: [],
      connect: clientsNotWorkingWith,
    },
    clientsNotWorkingWithIds: undefined,
  };
}
