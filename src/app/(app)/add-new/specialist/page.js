import React from 'react';
import { SpecialistApplicationWizard } from '@/app/_components/applications/specialist';
import { getSpecDictionaries } from '../../specialist/utils';

export const metadata = { title: 'Заявка спеціаліста' };

export default async function ApplySpecialistPage() {
  const dicts = await getSpecDictionaries();

  return <SpecialistApplicationWizard dicts={dicts} />;
}
