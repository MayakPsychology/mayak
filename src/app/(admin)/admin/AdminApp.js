'use client';

import React from 'react';
import { Admin, EditGuesser, ListGuesser, Resource, ShowGuesser } from 'react-admin';
import { dataProvider } from 'ra-data-simple-prisma';
import { RESOURCES } from '@admin/_lib/consts';
import { EventCreate, EventEdit, EventList, EventShow } from '@admin/components/Event';
import { FaqCreate, FaqEdit, FaqList } from '@admin/components/Faq';
import { TherapyCreate, TherapyEdit, TherapyList, TherapyShow } from '@admin/components/Therapy';
import {
  OrganizationCreate,
  OrganizationEdit,
  OrganizationShow,
  OrganizationsList,
} from '@admin/components/ServiceProvider/Organization';
import { MethodsCreate, MethodsEdit, MethodsList, MethodsShow } from '@admin/components/Methods';

import {
  SpecialistCreate,
  SpecialistEdit,
  SpecialistShow,
  SpecialistsList,
} from '@admin/components/ServiceProvider/Specialist';

import { NavigationEdit, NavigationList } from '@admin/components/Navigation';
import { ClientCategoryList } from '@admin/components/ClientCategoriesType';
import { ClientCategoryCreate } from '@admin/components/ClientCategoriesType/Create';
import { DonationDetailsList, DonateDetailsShow, DonationDetailsEdit } from '@admin/components/DonationDetails';

import { authProvider } from './authProvider';

export default function AdminPage() {
  const data = dataProvider('/api/admin');

  return (
    <Admin dataProvider={data} authProvider={authProvider}>
      <Resource
        name={RESOURCES.organization}
        options={{ label: 'Організації' }}
        list={OrganizationsList}
        show={OrganizationShow}
        create={OrganizationCreate}
        edit={OrganizationEdit}
      />
      <Resource
        name={RESOURCES.specialist}
        options={{ label: 'Спеціалісти' }}
        list={SpecialistsList}
        edit={SpecialistEdit}
        show={SpecialistShow}
        create={SpecialistCreate}
      />
      <Resource
        name={RESOURCES.therapy}
        options={{ label: 'Терапії' }}
        list={TherapyList}
        edit={TherapyEdit}
        create={TherapyCreate}
        show={TherapyShow}
      />
      <Resource
        name={RESOURCES.event}
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
        show={EventShow}
        options={{ label: 'Заходи' }}
      />
      <Resource
        name={RESOURCES.district}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        options={{ label: 'Райони' }}
      />
      <Resource
        name={RESOURCES.specialization}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        options={{ label: 'Спеціалізації' }}
      />
      <Resource
        name={RESOURCES.address}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        options={{ label: 'Адреси' }}
      />
      <Resource
        name={RESOURCES.faq}
        options={{ label: 'FAQ' }}
        list={FaqList}
        show={ShowGuesser}
        edit={FaqEdit}
        create={FaqCreate}
      />
      <Resource
        name={RESOURCES.feedback}
        options={{ label: "Зворотній зв'язок" }}
        list={ListGuesser}
        show={ShowGuesser}
        edit={EditGuesser}
      />
      <Resource
        name={RESOURCES.method}
        list={MethodsList}
        show={MethodsShow}
        edit={MethodsEdit}
        create={MethodsCreate}
        options={{ label: 'Методи терапії' }}
      />
      <Resource
        name={RESOURCES.clientCategory}
        options={{ label: 'Категорії клієнтів' }}
        list={ClientCategoryList}
        show={ShowGuesser}
        edit={EditGuesser}
        create={ClientCategoryCreate}
      />
      <Resource
        name={RESOURCES.navigation}
        options={{ label: 'Посилання' }}
        list={NavigationList}
        edit={NavigationEdit}
      />
      <Resource
        name={RESOURCES.donationDetails}
        options={{ label: 'Реквізити для донатів' }}
        list={DonationDetailsList}
        show={DonateDetailsShow}
        edit={DonationDetailsEdit}
      />
    </Admin>
  );
}
