import React from 'react';
import { SpecialistApplicationWizard } from '@/app/_components/applications/SpecialistApplicationWizard';
import { getSpecDictionaries } from '@/app/(app)/specialist/utils';

export default async function AddNewSpecialistModalPage() {
  const dicts = await getSpecDictionaries();
  return <SpecialistApplicationWizard dicts={dicts} />;
}
