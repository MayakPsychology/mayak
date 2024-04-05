import React from 'react';
import { BooleanField, Datagrid, List, TextField } from 'react-admin';

// export const donationDetails = {
//   donationEnabled: true,
//   title: 'Підтримати проект',
//   subtitle: 'Ваш донат допоможе...',
//   paypalLink: 'https://www.paypal.com/paypalme/',
//   privatLink: 'https://next.privat24.ua/',
//   bankDetailsEnabled: true,
//   enterpriceName: 'Соціальний проект "Маяк"',
//   iban: 'UA123456789012345678901234567',
//   enterpriseRegisterId: '12345678',
//   paymentPurpose: 'Благодійний внесок',
//   qrLink: 'https://next.privat24.ua',
// };

export function DonationDetailsList() {
  return (
    <List>
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <BooleanField label="Донати дозволені" source="donationEnabled" />
        <TextField label="Заголовок модального вікна" source="title" />
        <TextField label="Підзаголовок модального вікна" source="subtitle" />
        <TextField label="PayPal" source="paypalLink" />
        <TextField label="Privat24" source="privatLink" />
        <BooleanField label="Показувати реквізити" source="bankDetailsEnabled" />
      </Datagrid>
    </List>
  );
}
