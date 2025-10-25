'use client';

import React from 'react';
import { Create, SimpleForm, TextInput, useGetList } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { specialistCreateValidationSchema } from '@admin/_lib/validationSchemas/specialistSchema';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { transformSpecialistData } from '@admin/_utils/transformSpecialistData';
import { WorkTimeForm } from '@admin/components/ServiceProvider/WorkTimeForm';
import { filterMethodsBySpecializations } from '@admin/_utils/filterMethodsBySpecializations';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

export function SpecialistCreate() {
  const { data: specializationsData } = useGetList(RESOURCES.specialization);

  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.specialist}`,
  });

  const handleTransform = data =>
    transformSpecialistData(
      {
        ...data,
        specializationMethods: filterMethodsBySpecializations(
          data.specializationsIds,
          data.specializationMethodsIds,
          specializationsData,
        ),
      },
      { isEdit: false },
    );

  return (
    <Create
      title="Додавання нового спеціаліста"
      transform={handleTransform}
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
    >
      <SimpleForm resolver={zodResolver(specialistCreateValidationSchema)}>
        <GeneralInfoEditSpec />
        <DetailsEditSpec />
        <AddressesForm label="Адреси надання послуг" />
        <WorkTimeForm />
        <ServicesForm label="Послуги" />
        <TextInput name="description" source="description" label="Опис" fullWidth multiline />
        <ContactsList />
        <SocialLinks />
        <ActivationForm label="Активувати/деактивувати спеціаліста" />
      </SimpleForm>
    </Create>
  );
}
