'use client';

import PropTypes from 'prop-types';
import { SECTION_NOTE, StepHeader } from '../../_shared';
import { DescriptionField } from '../../_shared/fields';
import { ContactsGroup, SocialLinksGroup } from '../../_shared/field-groups';
import { OrganizationGeneralInfo } from '../field-groups';

export function Step1({ organizationTypes }) {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader title="Крок 1: Загальна інформація про організацію, представником якої я є" note={SECTION_NOTE} />
      <OrganizationGeneralInfo organizationTypes={organizationTypes} />
      <ContactsGroup title="Контактна інформація" fields={['phone', 'email']} isRequired />
      <SocialLinksGroup
        title="Соціальні мережі"
        fields={['instagram', 'facebook', 'youtube', 'tiktok', 'website']}
        isRequired
      />
      <DescriptionField
        label='Що ми можемо додати про Вас у пункті "Про Організацію"?'
        hint="Наприклад, зазначте освіту Ваших спеціалістів, розкажіть про цінності та досвід, можна зазначити діючі проєкти або акції."
        placeholder="Про клініку"
      />
    </fieldset>
  );
}

Step1.propTypes = {
  organizationTypes: PropTypes.array.isRequired,
};
