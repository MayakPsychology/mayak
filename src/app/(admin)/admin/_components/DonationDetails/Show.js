import { BooleanField, FunctionField, Show, SimpleShowLayout, TextField } from 'react-admin';
import { QRCodeSVG } from 'qrcode.react';

// model DonationDetails {
//   id                   String  @id @default(uuid()) @db.Uuid
//   donationEnabled      Boolean @default(true)
//   title                String  @unique @db.VarChar(50)
//   subtitle             String  @db.VarChar(50)
//   subtitleEnabled      Boolean @default(true)
//   paypalLink           String  @db.Text
//   paypalLinkEnabled    Boolean @default(true)
//   privatLink           String  @db.Text
//   privatLinkEnabled    Boolean @default(true)
//   bankDetailsEnabled   Boolean @default(true)
//   enterpriceName       String  @db.VarChar(128) // Назва підприємства
//   enterpriseRegisterId String  @db.VarChar(20) // ЄДРПОУ
//   paymentPurpose       String  @db.VarChar(50) // Призначення платежу
//   iban                 String  @db.VarChar(50) // IBAN
//   qrLink               String  @db.Text // посилання, яке буде відображене QR-кодом

//   @@map("donation_details")
// }

export function DonateDetailsShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <BooleanField label="Донати дозволені" source="donationEnabled" />
        <TextField label="Заголовок модального вікна" source="title" />
        <TextField label="Підзаголовок модального вікна" source="subtitle" />
        <BooleanField label="Показувати підзаголовок модального вікна" source="subtitleEnabled" />
        <BooleanField label="Показувати реквізити у модальному вікні" source="bankDetailsEnabled" />
        <TextField label="Посилання на PayPal" source="paypalLink" />
        <BooleanField label="Показувати секцію з донатом на PayPal" source="paypalLinkEnabled" />
        <TextField label="Посилання на Privat24" source="privatLink" />
        <BooleanField label="Показувати секцію з донатом на Privat24" source="privatLinkEnabled" />
        <TextField label="Назва підприємства" source="enterpriceName" />
        <TextField label="IBAN" source="iban" />
        <TextField label="ЄДРПОУ" source="enterpriseRegisterId" />
        <TextField label="Призначення платежу" source="paymentPurpose" />
        <BooleanField label="Показувати QR-код" source="qrEnabled" />
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
