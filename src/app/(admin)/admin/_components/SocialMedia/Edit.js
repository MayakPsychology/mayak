'use client';

import { Edit } from 'react-admin';
import React from 'react';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { SocialMediaFormShared } from '@admin/components/SocialMedia/SocialMediaFormShared';
import { socialMediaUseRedirectParams } from '@admin/components/SocialMedia/consts';

export function SocialMediaEdit() {
  const { handleError, handleSuccess } = useRedirectToList(socialMediaUseRedirectParams);

  return (
    <Edit
      title="Редагування соц мережі"
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      mutationMode="pessimistic"
    >
      <SocialMediaFormShared />
    </Edit>
  );
}
