'use client';

import PropTypes from 'prop-types';
import { SECTION_NOTE, StepHeader } from '../../_shared';
import { CheckBoxListGroup, ClientsPreferences } from '../../_shared/field-groups';

export function Step3({ clientCategories, specializations }) {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader
        title="Крок 3: Про фахівців організації"
        intro="У цьому підрозділі включено запитання про специфіку роботи організації крізь призму компетентностей спеціалістів, що там працюють."
        note={SECTION_NOTE}
      />
      <CheckBoxListGroup
        options={specializations}
        title="Які фахівці працюють у вашій організації?"
        hints={['Виберіть всіх фахівців, представлених у Вашій організації.']}
        name="expertSpecializations"
        labelsField="expertSpecializationNames"
        columns="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2"
      />
      <ClientsPreferences
        clientCategories={clientCategories}
        workingWithTitle="З якими клієнтами працюють фахівці у Вашій організації?"
        notWorkingWithTitle="З якими клієнтами НЕ працюють фахівці у Вашій організації?"
        workingWithHint='Якщо Ви бажаєте зазначити ще якусь категорію з якою Ви працюєте, але вона не включена в перелік, скористайтесь опцією "Інше"'
        notWorkingWithHint='Якщо Ви бажаєте зазначити ще якусь категорію з якою Ви НЕ працюєте, але вона не включена в перелік, скористайтесь опцією "Інше"'
      />
    </fieldset>
  );
}

Step3.propTypes = {
  clientCategories: PropTypes.array.isRequired,
  specializations: PropTypes.array.isRequired,
};
