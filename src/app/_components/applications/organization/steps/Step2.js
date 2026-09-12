'use client';

import PropTypes from 'prop-types';
import { INCLUSIVE_SPACE_OPTIONS } from '@/app/config/application/choices';
import { SECTION_NOTE, StepHeader } from '../../_shared';
import { RadioGroupField } from '../../_shared/fields';
import { AdressListGroup, FormatOfWorkGroup, WorkTimeGroup } from '../../_shared/field-groups';

export function Step2({ cities }) {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader title="Крок 2: Формат та графік роботи" note={SECTION_NOTE} />
      <RadioGroupField
        name="isInclusiveSpace"
        label="Якщо ви представляєте організацію, яка надає послуги офлайн, вкажіть, чи це є інклюзивним простором"
        options={INCLUSIVE_SPACE_OPTIONS}
      />
      <FormatOfWorkGroup title="Формат роботи організації" />
      <AdressListGroup cities={cities} />
      <WorkTimeGroup />
    </fieldset>
  );
}

Step2.propTypes = {
  cities: PropTypes.array,
};
