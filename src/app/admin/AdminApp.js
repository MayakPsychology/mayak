'use client';

import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { RESOURCES } from '@admin/_lib/consts';
import { EventCreate } from '@admin/components/Event';
import { FaqCreate, FaqEdit, ListFaq } from '@admin/components/Faq';
import { SpecialistCreate, SpecialistShow, SpecialistsList } from '@admin/components/Specialist';
import { authProvider } from './authProvider';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource
        name={RESOURCES.therapy}
        options={{ label: 'Therapy' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name={RESOURCES.specialist}
        options={{ label: 'Specialist' }}
        list={SpecialistsList}
        edit={EditGuesser}
        show={SpecialistShow}
        create={SpecialistCreate}
      />
      <Resource name={RESOURCES.event} list={ListGuesser} create={EventCreate} />
      <Resource name={RESOURCES.district} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.specialization} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name={RESOURCES.address} list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource
        name={RESOURCES.faq}
        options={{ label: 'FAQ' }}
        list={ListFaq}
        show={ShowGuesser}
        edit={FaqEdit}
        create={FaqCreate}
      />
      <Resource
        name={RESOURCES.feedback}
        options={{ label: 'Feedback' }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
}
