import { toConnectList, transformEditData } from './common';

export function transformSpecialistEditData({ specializationsIds, specializationMethodsIds, ...rest }) {
  const specializationsToConnect = toConnectList(specializationsIds);
  const specializationMethodsToConnect = toConnectList([].concat(...Object.values(specializationMethodsIds)));

  const base = transformEditData({ ...rest });

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
  };
}
