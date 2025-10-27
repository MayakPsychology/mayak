'use client';

import { NumberInput } from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { FormatOfWorkSelect } from '@admin/components/ServiceProvider/FormatOfWorkSelect';
import PropTypes from 'prop-types';
import { useActiveRequired } from '../hooks/useActiveRequired';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function DetailsEditOrg({ className }) {
  const { requiredIfActive } = useActiveRequired();
  return (
    <FormFieldWrapper title="Деталі" className={className}>
      <div className={fieldGroupClass}>
        <NumberInput
          name="yearsOnMarket"
          source="yearsOnMarket"
          label="Років на ринку"
          type="number"
          validate={requiredIfActive}
          min="0"
        />
        <FormatOfWorkSelect label="Формат роботи" validate={requiredIfActive} className="flex-1" />
      </div>
    </FormFieldWrapper>
  );
}

DetailsEditOrg.propTypes = {
  className: PropTypes.string,
};
