import React from 'react';
import { BooleanField, Datagrid, List, TextField } from 'react-admin';

export function DonationDetailsList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <BooleanField label="Донати дозволені" source="donationEnabled" />
        <TextField label="Заголовок модального вікна" source="title" />
        <TextField label="Підзаголовок модального вікна" source="subtitle" />
        <BooleanField label="Показувати підзаголовок модального вікна" source="subtitleEnabled" />
        <BooleanField label="Показувати реквізити у модальному вікні" source="bankDetailsEnabled" />
        <TextField label="Посилання на PayPal" source="paypalLink" />
        <BooleanField label="Показувати секцію з донатом на PayPal" source="paypalLinkEnabled" />
        <TextField label="Посилання на Privat24" source="privatLink" />
        <BooleanField label="Показувати секцію з донатом на Privat24" source="privatLinkEnabled" />
      </Datagrid>
    </List>
  );
}
