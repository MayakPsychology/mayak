'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { DescriptionField } from '../_shared/fields';
import { AdressListGroup, ContactsGroup, SocialLinksGroup, WorkTimeGroup } from '../_shared/field-groups';
import { SpecialistGeneralInfo } from './field-groups';

export function Step1({ districts }) {
  return (
    <div className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <SpecialistGeneralInfo />
      <AdressListGroup districts={districts} />
      <WorkTimeGroup />
      <ContactsGroup />
      <SocialLinksGroup />
      <DescriptionField />
    </div>
  );
}

Step1.propTypes = {
  districts: PropTypes.array,
};
