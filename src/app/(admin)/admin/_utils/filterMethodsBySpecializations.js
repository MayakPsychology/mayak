import { PSYCHOLOGIST, PSYCHOTHERAPIST } from '@admin/_lib/consts';

export const filterMethodsBySpecializations = (
  specializationsIds = [],
  specializationMethodsIds = { psychologist: [], psychotherapist: [] },
  specializationsData = [],
) => {
  const selectedSpecializationNamesList = specializationsIds.map(id => {
    const specializationData = specializationsData.find(s => s.id === id);
    return specializationData?.name?.toLowerCase();
  });

  const psychologistMethodsList = selectedSpecializationNamesList.includes(PSYCHOLOGIST.toLowerCase())
    ? specializationMethodsIds.psychologist
    : [];

  const psychotherapistMethodsList = selectedSpecializationNamesList.includes(PSYCHOTHERAPIST.toLowerCase())
    ? specializationMethodsIds.psychotherapist
    : [];

  return [...psychologistMethodsList, ...psychotherapistMethodsList];
};
