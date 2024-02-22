import { Loading, SelectArrayInput, required, useGetList } from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';

export function SelectTherapies({ validate }) {
  const { data: therapies, isLoading } = useGetList(RESOURCES.therapy);
  if (isLoading) return <Loading />;
  return (
    <SelectArrayInput
      label="Типи"
      source="therapies"
      validate={validate}
      choices={therapies.map(therapy => ({ id: therapy.name, name: therapy.name }))}
    />
  );
}
