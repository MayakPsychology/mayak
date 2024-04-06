'use client';

import { AutocompleteArrayInput, ReferenceArrayInput } from 'react-admin';
import PropTypes from 'prop-types';
import { FORM_TYPES } from '@admin/_lib/consts';
import { useFormState } from 'react-hook-form';

export function ClientCategoriesSelect({ type = FORM_TYPES.create }) {
  const { errors } = useFormState();

  const clientsWorkingWithSource = type === FORM_TYPES.create ? 'clientsWorkingWith' : 'clientsWorkingWithIds';
  const clientsNotWorkingWithSource = type === FORM_TYPES.create ? 'clientsNotWorkingWith' : 'clientsNotWorkingWithIds';

  const clientsDuplicationErrorMessage = errors?.clients ? errors?.clients.root.message : '';
  const displayError = errors?.clients && (
    <p className="my-1 text-c3 tracking-wide text-system-error">{clientsDuplicationErrorMessage}</p>
  );

  return (
    <>
      {displayError}
      <ReferenceArrayInput source={clientsWorkingWithSource} reference="ClientCategory">
        <AutocompleteArrayInput name="clients.workingWith" label="Працює з наступними клієнтами" optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput source={clientsNotWorkingWithSource} reference="ClientCategory">
        <AutocompleteArrayInput
          name="clients.notWorkingWith"
          label="НЕ працює з наступними клієнтами"
          optionText="name"
        />
      </ReferenceArrayInput>
    </>
  );
}

ClientCategoriesSelect.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
};
