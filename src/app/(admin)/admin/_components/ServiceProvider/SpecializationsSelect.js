import PropTypes from 'prop-types';
import { AutocompleteArrayInput, ReferenceArrayInput, SelectArrayInput, required, useGetList } from 'react-admin';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';

export function SpecializationsSelect({ label, source, type = FORM_TYPES.create, ...props }) {
  const { data: specializationsList, isLoading: specializationsLoading } = useGetList(RESOURCES.specialization);

  return (
    <>
      {type === FORM_TYPES.create ? (
        <SelectArrayInput
          name={source.create}
          source={source.create}
          label={label}
          isLoading={specializationsLoading}
          choices={specializationsList}
          validate={required()}
          {...props}
        />
      ) : (
        <ReferenceArrayInput source={source.update} reference="Specialization">
          <AutocompleteArrayInput label={label} optionValue="id" optionText="name" validate={required()} {...props} />
        </ReferenceArrayInput>
      )}
    </>
  );
}

SpecializationsSelect.propTypes = {
  source: PropTypes.shape({
    create: PropTypes.string,
    update: PropTypes.string,
  }),
  label: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
};
