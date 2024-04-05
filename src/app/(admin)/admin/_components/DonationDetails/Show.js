import { BooleanField, FunctionField, Show, SimpleShowLayout, TextField } from 'react-admin';
import { QRCodeSVG } from 'qrcode.react';

export function DonateDetailsShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <BooleanField label="Донати дозволені" source="donationEnabled" />
        <TextField label="Заголовок модального вікна" source="title" />
        <TextField label="Підзаголовок модального вікна" source="subtitle" />
        <BooleanField label="Показувати реквізити у модальному вікні" source="bankDetailsEnabled" />
        <TextField label="PayPal" source="paypalLink" />
        <TextField label="Privat24" source="privatLink" />
        <TextField label="Назва підприємства" source="enterpriceName" />
        <TextField label="IBAN" source="iban" />
        <TextField label="ЄДРПОУ" source="enterpriseRegisterId" />
        <TextField label="Призначення платежу" source="paymentPurpose" />
        <TextField label="Посилання для QR-коду" source="qrLink" />
        <FunctionField
          label="QR-код"
          render={record => (
            <a href={record.qrLink} target="_blank" rel="noopener noreferrer">
              <QRCodeSVG size={200} value={record.qrLink} />
            </a>
          )}
        />
      </SimpleShowLayout>
    </Show>
  );
}
