'use client';

import PropTypes from 'prop-types';
import { CheckBoxListGroup, ContactsGroup, SocialLinksGroup } from '../../_shared/field-groups';
import { DescriptionField } from '../../_shared/fields';
import { OrganizationGeneralInfo } from '../field-groups';

export function Step1({ organizationTypes }) {
  return (
    <fieldset className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <legend>Крок 1: Загальна інформація</legend>
      <p>
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
      <OrganizationGeneralInfo />
      <CheckBoxListGroup
        options={organizationTypes}
        title="Тип організації"
        name="type"
        labelsField="typeNames"
      />
      <ContactsGroup />
      <SocialLinksGroup />
      <DescriptionField label="Що ми можемо додати про вашу організацію у пункт Опис?" />
    </fieldset>
  );
}

Step1.propTypes = {
  organizationTypes: PropTypes.array.isRequired,
};
