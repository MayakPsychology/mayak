import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';
import { DonationDetailsSchema } from '@admin/_lib/validationSchemas/donationDetailsSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export function DonationDetailsEdit() {
  return (
    <Edit>
      <SimpleForm reValidateMode="onChange" resolver={zodResolver(DonationDetailsSchema)}>
        <BooleanInput label="Донати дозволені" source="donationEnabled" />
        <TextInput label="Заголовок модального вікна" source="title" fullWidth />
        <BooleanInput label="Показувати підзаголовок модального вікна" source="subtitleEnabled" />
        <TextInput label="Підзаголовок модального вікна" fullWidth source="subtitle" />
        <BooleanInput label="Показувати реквізити у модальному вікні" fullWidth source="bankDetailsEnabled" />
        <TextInput label="Посилання на PayPal" fullWidth source="paypalLink" />
        <BooleanInput label="Показувати секцію з донатом на PayPal" source="paypalLinkEnabled" />
        <TextInput label="Посилання на Privat24" source="privatLink" />
        <BooleanInput label="Показувати секцію з донатом на Privat24" fullWidth source="privatLinkEnabled" />
        <TextInput label="Назва підприємства" source="enterpriceName" />
        <TextInput label="IBAN" source="iban" />
        <TextInput label="ЄДРПОУ" source="enterpriseRegisterId" />
        <TextInput label="Призначення платежу" source="paymentPurpose" />
        <BooleanInput label="Показувати QR-код" source="qrEnabled" />
        <TextInput label="Посилання для QR-коду" source="qrLink" />
      </SimpleForm>
    </Edit>
  );
}
