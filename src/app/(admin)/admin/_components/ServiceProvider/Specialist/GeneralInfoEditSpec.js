'use client';

import { required, TextInput } from 'react-admin';
import PropTypes from 'prop-types';
import { FORM_TYPES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { ClientCategoriesSelect } from '@admin/components/ServiceProvider/ClientCategoriesSelect';
import { SpecializationsSelect } from '@admin/components/ServiceProvider/SpecializationsSelect';
import { useWatch } from 'react-hook-form';
import { SpecializationMethodsList } from '@admin/components/ServiceProvider/Specialist/SpecializationMethodsList';

export function GeneralInfoEditSpec({ type = FORM_TYPES.create }) {
  const specializationsNameToWatch = type === FORM_TYPES.create ? 'specializations' : 'specializationsIds';
  const selectedSpecializationsIdList = useWatch({ name: specializationsNameToWatch });

  return (
    <FormFieldWrapper title="Основна інформація">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInput key="firstName" name="firstName" type="text" label={`Ім'я`} validate={required()} />
        <TextInput key="lastName" name="lastName" type="text" label="Прізвище" validate={required()} />
        <TextInput key="surname" name="surname" type="text" label="По-батькові" />
      </div>
      <ClientCategoriesSelect type={type} />
      <SpecializationsSelect
        source={{ create: 'specializations', update: 'specializationsIds' }}
        type={type}
        label="Спеціалізації"
        fullWidth
      />
      <SpecializationMethodsList type={type} specializationsIdList={selectedSpecializationsIdList} />
    </FormFieldWrapper>
  );
}

GeneralInfoEditSpec.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
};
