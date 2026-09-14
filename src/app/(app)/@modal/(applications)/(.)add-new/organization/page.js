import React from 'react';
import { OrganizationApplicationWizard } from '@/app/_components/applications/organization';
import { getOrgDictionaries } from '@/app/(app)/specialist/utils';

export default async function ApplyOrganizationModalPage() {
  const dicts = await getOrgDictionaries();

  return <OrganizationApplicationWizard dicts={dicts} />;
}
