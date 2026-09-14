'use client';

import PropTypes from 'prop-types';
import { StepHeader } from '../../_shared';
import { AdressListGroup, FormatOfWorkGroup, WorkTimeGroup } from '../../_shared/field-groups';

export function Step2({ cities }) {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader title="Крок 2: Формат роботи та адреси" />
      <FormatOfWorkGroup />
      <AdressListGroup cities={cities} />
      <WorkTimeGroup />
    </fieldset>
  );
}

Step2.propTypes = {
  cities: PropTypes.array,
};
