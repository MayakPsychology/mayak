import { toConnectList, transformEditData } from './common';

export function transformOrganizationEditData({ organizationTypesIds, ...rest }) {
  const organizationTypesToConnect = toConnectList(organizationTypesIds);
  const base = transformEditData(rest);
  return {
    ...base,
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
    organizationTypesIds: undefined,
  };
}
