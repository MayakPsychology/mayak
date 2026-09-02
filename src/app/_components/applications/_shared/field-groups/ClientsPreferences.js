'use client';

import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { ClientCategoriesGroup } from './ClientCategoriesGroup';

export function ClientsPreferences({ clientCategories }) {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.clients?.root?.message;

  return (
    <div className="flex flex-col gap-10">
      <ClientCategoriesGroup
        clientCategories={clientCategories}
        title="З якими клієнтами ви працюєте?"
        name="clients.workingWith"
        otherField="clients.workingWithOther"
        categoryLabels="clients.workingWithNames"
      />

      <ClientCategoriesGroup
        clientCategories={clientCategories}
        title="З якими клієнтами ви не працюєте?"
        name="clients.notWorkingWith"
        otherField="clients.notWorkingWithOther"
        categoryLabels="clients.notWorkingWithNames"
      />

      {errorMessage && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">{errorMessage}</p>
      )}
    </div>
  );
}

ClientsPreferences.propTypes = {
  clientCategories: PropTypes.array.isRequired,
};
