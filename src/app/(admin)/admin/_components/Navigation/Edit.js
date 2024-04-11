'use client';

import { Edit, required, SaveButton, SelectInput, SimpleForm, TextInput, Toolbar } from 'react-admin';
import React from 'react';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { socialMediaUseRedirectParams } from '@admin/components/Navigation/consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationSchema } from '@admin/_lib/validationSchemas/navigationSchema';
import { NavigationUrl } from '@prisma/client';

export const EditToolbar = () => (
  <Toolbar>
    <SaveButton label="Save" />
  </Toolbar>
);

export function NavigationEdit() {
  const { handleError, handleSuccess } = useRedirectToList(socialMediaUseRedirectParams);

  const urlChoices = Object.values(NavigationUrl).map(item => ({
    id: item,
    name: item,
  }));

  return (
    <Edit
      title="Редагування соц мережі"
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      mutationMode="pessimistic"
    >
      <SimpleForm className="max-w-[500px]" resolver={zodResolver(NavigationSchema)} toolbar={<EditToolbar />}>
        <SelectInput disabled source="title" label="Соц мережа" choices={urlChoices} fullWidth />
        <TextInput source="href" label="Посилання" validate={required()} fullWidth />
      </SimpleForm>
    </Edit>
  );
}
