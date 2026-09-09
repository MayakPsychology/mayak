import { toConnectList, transformCreateData } from '@admin/_utils/common';

const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

export const transformSpecialistData = ({ specializations, specializationMethods, ...rest }) => {
  const base = transformCreateData(rest);

  return {
    ...base,
    specializations: {
      connect: specializations?.length ? toConnectList(specializations) : undefined,
    },
    specializationMethods: {
      connect: specializationMethods?.length ? mapIdArrayToIdObjects(specializationMethods) : undefined,
    },
  };
};
