import React from 'react';
import { OrganizationApplicationWizard } from '@/app/_components/applications/organization';
import { getOrgDictionaries } from '../../specialist/utils';

export const metadata = { title: 'Заявка організації' };

export default async function ApplyOrganizationPage() {
  const dicts = await getOrgDictionaries();

  return <OrganizationApplicationWizard dicts={dicts} />;
}
