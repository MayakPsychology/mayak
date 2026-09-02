import { useApplicationSubmit } from './useApplicationSubmit';

export const useOrganizationApplication = () => useApplicationSubmit('/api/organization');
