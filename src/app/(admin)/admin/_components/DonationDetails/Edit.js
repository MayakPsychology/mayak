import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';

export function DonationDetailsEdit() {
  return (
    <Edit>
      <SimpleForm>
        <BooleanInput label="Донати дозволені" source="donationEnabled" />
        <TextInput label="Заголовок модального вікна" source="title" />
        <TextInput label="Підзаголовок модального вікна" source="subtitle" />
        <BooleanInput label="Показувати реквізити у модальному вікні" source="bankDetailsEnabled" />
        <TextInput label="PayPal" source="paypalLink" />
        <TextInput label="Privat24" source="privatLink" />
        <TextInput label="Назва підприємства" source="enterpriceName" />
        <TextInput label="IBAN" source="iban" />
        <TextInput label="ЄДРПОУ" source="enterpriseRegisterId" />
        <TextInput label="Призначення платежу" source="paymentPurpose" />
        <TextInput label="Посилання для QR-коду" source="qrLink" />
        {/* <FunctionField
          label="QR-код"
          render={record => (
            <a href={record.qrLink} target="_blank" rel="noopener noreferrer">
              <QRCodeSVG size={200} value={record.qrLink} />
            </a>
          )}
        /> */}
      </SimpleForm>
    </Edit>
  );
}
