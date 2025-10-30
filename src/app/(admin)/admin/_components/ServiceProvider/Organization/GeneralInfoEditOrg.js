'use client';

import { BooleanInput, TextInput, required } from 'react-admin';
import PropTypes from 'prop-types';
import { FORM_TYPES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { useActiveRequired } from '../hooks/useActiveRequired';
import { ClientCategoriesSelect } from '../ClientCategoriesSelect';
import { SpecializationsSelect } from '../SpecializationsSelect';
import { OrganizationTypesSelect } from './OrganizationTypesSelect';
import { OwnershipTypeSelect } from './OwnershipTypeSelect';

export function GeneralInfoEditOrg({ type = FORM_TYPES.create }) {
  const { requiredIfActive } = useActiveRequired();
  return (
    <FormFieldWrapper title="Основна інформація">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInput fullWidth source="name" label="Назва організації" validate={required()} />
      </div>
      <OrganizationTypesSelect label="Типи організації" type={type} validate={requiredIfActive} />
      <ClientCategoriesSelect type={type} />
      <OwnershipTypeSelect label="Форма власності" validate={requiredIfActive} />
      <BooleanInput label="Інклюзивний простір" source="isInclusiveSpace" validate={requiredIfActive} />
      <SpecializationsSelect
        source={{ create: 'expertSpecializations', update: 'expertSpecializationIds' }}
        type={type}
        label="Спеціалізації працівників"
        fullWidth
        validate={requiredIfActive}
      />
    </FormFieldWrapper>
  );
}

GeneralInfoEditOrg.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  className: PropTypes.string,
};
