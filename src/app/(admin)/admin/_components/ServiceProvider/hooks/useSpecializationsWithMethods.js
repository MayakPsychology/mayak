import { useGetList } from 'react-admin';
import { PSYCHOLOGIST, PSYCHOTHERAPIST, RESOURCES } from '@admin/_lib/consts';

export const useSpecializationsWithMethods = ({ specializationsIdList = [] }) => {
  const { data: specializationsData } = useGetList(RESOURCES.specialization);
  const { data: methodsData } = useGetList(RESOURCES.method, {
    pagination: { page: 1, perPage: 200 },
    sort: { field: 'title', order: 'ASC' },
  });

  const specializationsWithMethodsList = specializationsIdList.length
    ? specializationsData
      ?.filter(
        ({ id, name }) =>
          specializationsIdList?.includes(id) &&
            (name.toLowerCase() === PSYCHOLOGIST.toLowerCase() || name.toLowerCase() === PSYCHOTHERAPIST.toLowerCase()),
      )
      .map(s => ({
        ...s,
        specializationMethods: methodsData
          ?.filter(m => m.specialization.name.toLowerCase() === s.name.toLowerCase())
          .map(({ id, title }) => ({ id, name: title })),
      }))
    : [];

  return { specializationsWithMethodsList };
};
