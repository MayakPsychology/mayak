'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { DescriptionField } from '../_shared/fields';
import { ContactsGroup, SocialLinksGroup } from '../_shared/field-groups';
import { SpecialistGeneralInfo } from './field-groups';

export function Step1() {
  return (
    <fieldset className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <legend>Крок 1: Персональні дані</legend>
      <p>
        Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами буде висвітлена на
        сайті.
      </p>
      <SpecialistGeneralInfo />
      <ContactsGroup />
      <SocialLinksGroup />
      <DescriptionField />
    </fieldset>
  );
}

Step1.propTypes = {
  districts: PropTypes.array,
};
