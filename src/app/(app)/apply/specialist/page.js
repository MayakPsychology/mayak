import React from 'react';
import { SpecialistApplicationWizard } from '@/app/_components/applications/SpecialistApplicationWizard';
import { getSpecDictionaries } from '../../specialist/utils';

export default async function AddNewSpecialistPage() {
  const dicts = await getSpecDictionaries();

  return <SpecialistApplicationWizard dicts={dicts} />;
}
