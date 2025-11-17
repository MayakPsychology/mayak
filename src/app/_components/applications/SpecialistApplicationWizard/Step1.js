'use client';

import React from 'react';
import { DistrictsGroup } from '../_shared/field-groups';
import { SpecialistGeneralInfo } from './field-groups';

export function Step1() {
  return (
    <div className="flex w-full flex-col gap-14 sm:gap-11 lg:w-full lg:max-w-none lg:gap-10">
      <SpecialistGeneralInfo />
      <DistrictsGroup />
    </div>
  );
}
