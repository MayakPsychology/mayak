'use client';

import React from 'react';
import { Admin, ListGuesser, Resource, ShowGuesser, EditGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { authProvider } from './authProvider';
import { ListFaq } from './_components/faq';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource
        name="Therapy"
        options={{ label: 'Therapy' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource
        name="Specialist"
        options={{ label: 'Specialist' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource name="District" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="Specialization" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource name="Address" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
      <Resource
        name="PlaceOfWork"
        options={{ label: 'Place of work' }}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
      />
      <Resource name="Faq" options={{ label: 'FAQ' }} list={ListFaq} show={ShowGuesser} edit={EditGuesser} />
      <Resource
        name="Feedback"
        options={{ label: 'Feedback' }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
    </Admin>
  );
}
