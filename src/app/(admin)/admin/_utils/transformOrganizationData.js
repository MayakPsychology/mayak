import { toConnectList, transformCreateData } from '@admin/_utils/common';

const mapIdArrayToIdObjects = idList => idList.map(id => ({ id }));

// this function transforms form data to proper prisma creation object
export const transformOrganizationData = ({ type, ...rest }) => {
  const base = transformCreateData(rest);

  return {
    ...base,
    expertSpecializations: {
      connect: rest.expertSpecializations?.length ? mapIdArrayToIdObjects(rest.expertSpecializations) : undefined,
    },
    type: {
      connect: type?.length ? toConnectList(type) : undefined,
    },
  };
};
