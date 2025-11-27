'use client';

import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { ClientCategoriesGroup } from './ClientCategoriesGroup';

export function ClientsPreferences({ clientCategories }) {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const workingWithArr = useWatch({ control, name: 'clientsWorkingWith' });
  const notWorkingWithArr = useWatch({ control, name: 'clientsNotWorkingWith' });
  // todo: impement dupicate checking in zod schema
  // Teporary solution to prevent selecting the same categories in both groups
  const workingWith = useMemo(() => workingWithArr || [], [workingWithArr]);
  const notWorkingWith = useMemo(() => notWorkingWithArr || [], [notWorkingWithArr]);

  useEffect(() => {
    const hasDuplication = workingWith?.some(id => notWorkingWith?.includes(id));

    if (hasDuplication) {
      setError('clients', {
        type: 'manual',
        message: 'Ви не можете обирати однакові категорії клієнтів у двох секціях.',
      });
    } else {
      clearErrors('clients');
    }
  }, [workingWith, notWorkingWith, setError, clearErrors]);

  return (
    <div className="flex flex-col gap-10">
      <ClientCategoriesGroup
        clientCategories={clientCategories}
        title="З якими клієнтами ви працюєте?"
        name="clientsWorkingWith"
        additionalName="clientsWorkingWithAdditional"
        error={errors?.clients?.message}
      />

      <ClientCategoriesGroup
        clientCategories={clientCategories}
        title="З якими клієнтами ви не працюєте?"
        name="clientsNotWorkingWith"
        additionalName="clientsNotWorkingWithAdditional"
        error={errors?.clients?.message}
      />
    </div>
  );
}

ClientsPreferences.propTypes = {
  clientCategories: PropTypes.array.isRequired,
};
