import { toConnectList, transformEditData } from './common';

export function transformOrganizationEditData({ expertSpecializationIds, organizationTypesIds, ...rest }) {
  const organizationTypesToConnect = toConnectList(organizationTypesIds);
  const expertSpecializationsToConnect = toConnectList(expertSpecializationIds);
  const base = transformEditData({ ...rest });

  return {
    ...base,
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
    expertSpecializations: {
      set: [],
      connect: expertSpecializationsToConnect,
    },
    organizationTypesIds: undefined,
  };
}
