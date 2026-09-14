'use client';

import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { ClientCategoriesGroup } from './ClientCategoriesGroup';

const otherHint = subject =>
  `Якщо Ви бажаєте зазначити ще якусь категорію населення, з якою Ви ${subject}, але вона не ` +
  'включена в перелік, скористайтесь опцією "Інше".';

export function ClientsPreferences({
  clientCategories,
  workingWithTitle = 'З якими клієнтами Ви працюєте?',
  notWorkingWithTitle = 'З якими клієнтами Ви НЕ працюєте?',
  workingWithHint = otherHint('працюєте'),
  notWorkingWithHint = otherHint('НЕ працюєте'),
}) {
  const {
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.clients?.root?.message;

  return (
    <div className="flex flex-col gap-10">
      <ClientCategoriesGroup
        clientCategories={clientCategories}
        title={workingWithTitle}
        hints={[workingWithHint]}
        name="clients.workingWith"
        otherField="clients.workingWithOther"
        categoryLabels="clients.workingWithNames"
      />

      <ClientCategoriesGroup
        clientCategories={clientCategories}
        title={notWorkingWithTitle}
        hints={[notWorkingWithHint]}
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
  workingWithTitle: PropTypes.string,
  notWorkingWithTitle: PropTypes.string,
  workingWithHint: PropTypes.string,
  notWorkingWithHint: PropTypes.string,
};
