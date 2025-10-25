import { toConnectList, transformCreateData, transformEditData } from '@admin/_utils/common';

const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

export const transformSpecialistData = (input, { isEdit = false } = {}) => {
  const { specializations, specializationsIds, specializationMethods, specializationMethodsIds, ...rest } = input;

  // get method and spec Ids
  const specIds = specializations || specializationsIds || [];
  const methodIds = specializationMethods || [].concat(...Object.values(specializationMethodsIds || {}));

  // call edit or create function
  const base = isEdit ? transformEditData(rest) : transformCreateData(rest);

  return {
    ...base,
    specializations: isEdit ? { set: [], connect: toConnectList(specIds) } : { connect: toConnectList(specIds) },

    specializationMethods: isEdit
      ? { set: [], connect: mapIdArrayToIdObjects(methodIds) }
      : { connect: mapIdArrayToIdObjects(methodIds) },
  };
};
