import { BooleanField, FunctionField, Show, SimpleShowLayout, TextField } from 'react-admin';
import { QRCodeSVG } from 'qrcode.react';

export function DonateDetailsShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <BooleanField label="Донати дозволені" source="isDonationEnabled" />
        <TextField label="Заголовок модального вікна" source="title" />
        <TextField label="Підзаголовок модального вікна" source="subtitle" />
        <BooleanField label="Показувати підзаголовок модального вікна" source="isSubtitleEnabled" />
        <BooleanField label="Показувати реквізити у модальному вікні" source="isBankDetailsEnabled" />
        <TextField label="Посилання на PayPal" source="paypalLink" />
        <BooleanField label="Показувати секцію з донатом на PayPal" source="isPayPalLinkEnabled" />
        <TextField label="Посилання на Privat24" source="privatLink" />
        <BooleanField label="Показувати секцію з донатом на Privat24" source="isPrivatLinkEnabled" />
        <TextField label="Назва підприємства" source="enterpriceName" />
        <TextField label="IBAN" source="iban" />
        <TextField label="ЄДРПОУ" source="enterpriseRegisterId" />
        <TextField label="Призначення платежу" source="paymentPurpose" />
        <BooleanField label="Показувати QR-код" source="isQREnabled" />
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
