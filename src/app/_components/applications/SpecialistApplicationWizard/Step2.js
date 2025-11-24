'use client';

import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ClientCategoriesGroup } from '../_shared/field-groups';

export function Step2() {
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
    <fieldset className="mb-6">
      <div className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
        <ClientCategoriesGroup
          title="З якими клиєнтами ви працюєте?"
          name="clientsWorkingWith"
          additionalName="clientsWorkingWithAdditional"
          error={errors?.clients?.message}
        />
      </div>
      <div className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
        <ClientCategoriesGroup
          title="З якими клиєнтами ви не працюєте?"
          name="clientsNotWorkingWith"
          additionalName="clientsNotWorkingWithAdditional"
          error={errors?.clients?.message}
        />
      </div>
    </fieldset>
  );
}
