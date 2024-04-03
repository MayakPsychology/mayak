import { toConnectList, transformEditData } from './common';

export function transformOrganizationEditData({
  organizationTypesIds,
  expertSpecializationIds,
  socialLink,
  clients,
  ...rest
}) {
  const organizationTypesToConnect = toConnectList(organizationTypesIds);
  const expertSpecializationsToConnect = toConnectList(expertSpecializationIds);
  const base = transformEditData({ ...rest });

  const clientsWorkingWith = toConnectList(clients.workingWith);
  const clientsNotWorkingWith = toConnectList(clients.notWorkingWith);

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
