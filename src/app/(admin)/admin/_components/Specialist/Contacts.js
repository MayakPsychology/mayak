import React from 'react';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';
import { TextInputList } from '@admin/components/TextInputList';
import { useWatch } from 'react-hook-form';
import { MatchingEntityList } from '@admin/_components';
import { EMAIL, PHONE } from '@admin/_lib/consts';

export function Contacts() {
  const { phone, email, website } = SpecialistFormFields;
  const contactsList = [phone, email, website];

  const currentPhone = useWatch({ name: PHONE });
  const currentEmail = useWatch({ name: EMAIL });
  const matchingParams = { phone: currentPhone, email: currentEmail };

  return (
    <FormFieldWrapper title={SpecialistFormSections.contacts}>
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList list={contactsList} />
      </div>
      <MatchingEntityList matchingParams={matchingParams} className="mb-7" />
    </FormFieldWrapper>
  );
}
