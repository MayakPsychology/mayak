'use client';

import React from 'react';
import { StepHeader } from '../../_shared';
import { DescriptionField } from '../../_shared/fields';
import { ContactsGroup, SocialLinksGroup } from '../../_shared/field-groups';
import { SpecialistGeneralInfo } from '../field-groups';

export function Step1() {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader title="Крок 1: Персональні дані" />
      <SpecialistGeneralInfo />
      <ContactsGroup title="Контактні дані" fields={['phone', 'email']} isRequired />
      <SocialLinksGroup
        title="Соціальні мережі"
        fields={['instagram', 'facebook', 'youtube', 'tiktok', 'website']}
        isRequired
      />
      <DescriptionField
        label='Що ми можемо додати про Вас у пункті "Про себе"?'
        hint="Наприклад, розкажіть про цінності, можна зазначити діючі проєкти або акції."
        placeholder="Про себе"
      />
    </fieldset>
  );
}
