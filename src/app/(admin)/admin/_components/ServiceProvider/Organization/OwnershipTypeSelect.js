import PropTypes from 'prop-types';
import { OwnershipType } from '@prisma/client';
import { SelectInput } from 'react-admin';
import { getChoicesList } from '@admin/_utils/common';
import { FormTranslations } from '@admin/_lib/translations';

export function OwnershipTypeSelect({ label, ...props }) {
  const choices = getChoicesList(Object.values(OwnershipType), FormTranslations.ownershipType);
  return (
    <SelectInput name="ownershipType" source="ownershipType" label={label} choices={choices} fullWidth {...props} />
  );
}

OwnershipTypeSelect.propTypes = {
  label: PropTypes.string,
};
