'use client';

import { useWatch } from 'react-hook-form';
import { NumberInput, required } from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { GenderSelect } from '@admin/components/ServiceProvider/GenderSelect';
import { FormatOfWorkSelect } from '@admin/components/ServiceProvider/FormatOfWorkSelect';
import PropTypes from 'prop-types';

export function DetailsEditSpec({ className }) {
  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();
  return (
    <FormFieldWrapper title="Деталі" className={className}>
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <GenderSelect label="Стать" validate={unnecessaryForDraft} />
        <NumberInput
          name="yearsOfExperience"
          source="yearsOfExperience"
          label="Роки стажу"
          type="number"
          validate={unnecessaryForDraft}
          min="0.5"
          step={0.5}
        />
        <FormatOfWorkSelect label="Формат роботи" validate={unnecessaryForDraft} className="flex-1" />
      </div>
    </FormFieldWrapper>
  );
}

DetailsEditSpec.propTypes = {
  className: PropTypes.string,
};
