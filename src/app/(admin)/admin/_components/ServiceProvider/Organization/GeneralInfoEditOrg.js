'use client';

import { BooleanInput, TextInput, required } from 'react-admin';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import { FORM_TYPES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { ClientCategoriesSelect } from '../ClientCategoriesSelect';
import { SpecializationsSelect } from '../SpecializationsSelect';
import { OrganizationTypesSelect } from './OrganizationTypesSelect';
import { OwnershipTypeSelect } from './OwnershipTypeSelect';

export function GeneralInfoEditOrg({ type = FORM_TYPES.create }) {
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();
  return (
    <FormFieldWrapper title="Основна інформація">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInput fullWidth source="name" label="Назва організації" validate={required()} />
      </div>
      <OrganizationTypesSelect label="Типи організації" type={type} validate={unnecessaryForDraft} />
      <ClientCategoriesSelect type={type} />
      <OwnershipTypeSelect label="Форма власності" validate={unnecessaryForDraft} />
      <BooleanInput label="Інклюзивний простір" source="isInclusiveSpace" validate={unnecessaryForDraft} />
      <SpecializationsSelect
        source={{ create: 'expertSpecializations', update: 'expertSpecializationIds' }}
        type={type}
        label="Спеціалізації працівників"
        fullWidth
      />
    </FormFieldWrapper>
  );
}

GeneralInfoEditOrg.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  className: PropTypes.string,
};
