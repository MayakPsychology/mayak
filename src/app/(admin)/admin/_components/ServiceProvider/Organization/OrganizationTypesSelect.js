import PropTypes from 'prop-types';
import { AutocompleteArrayInput, ReferenceArrayInput, required, SelectArrayInput, useGetList } from 'react-admin';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';

export function OrganizationTypesSelect({ label, type = FORM_TYPES.create, ...props }) {
  const { data: typesList, isLoading: typesLoading } = useGetList(RESOURCES.organizationType);

  return (
    <>
      {type === FORM_TYPES.create ? (
        <SelectArrayInput
          name="type"
          source="type"
          label={label}
          isLoading={typesLoading}
          choices={typesList}
          fullWidth
          validate={required()}
          {...props}
        />
      ) : (
        <ReferenceArrayInput source="organizationTypesIds" reference="OrganizationType">
          <AutocompleteArrayInput
            fullWidth
            label={label}
            optionValue="id"
            optionText="name"
            validate={required()}
            {...props}
          />
        </ReferenceArrayInput>
      )}
    </>
  );
}

OrganizationTypesSelect.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
};
