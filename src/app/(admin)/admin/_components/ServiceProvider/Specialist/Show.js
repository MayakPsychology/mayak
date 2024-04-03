import {
  ArrayField,
  BooleanField,
  ChipField,
  Datagrid,
  DateField,
  FunctionField,
  NumberField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  WrapperField,
} from 'react-admin';
import { WorkTimeShow } from '@admin/components/ServiceProvider/WorkTimeShow';

export function SpecialistShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <ArrayField label="Спеціалізації" source="specializations">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Працює з наступними клієнтами" source="clientsWorkingWith">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Не працює з наступними клієнтами" source="clientsNotWorkingWith">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <ArrayField label="Методи і напрямки" source="specializationMethods">
          <SingleFieldList linkType={false}>
            <ChipField source="title" size="small" />
          </SingleFieldList>
        </ArrayField>
        <TextField label="Ім'я" source="firstName" />
        <TextField label="Прізвище" source="lastName" />
        <TextField label="По-батькові" source="surname" />
        <TextField label="Стать" source="gender" />
        <DateField showTime label="Дата додавання у сервіс" source="createdAt" />
        <NumberField label="Роки стажу" source="yearsOfExperience" />
        <TextField label="Формат роботи" source="formatOfWork" />
        <ArrayField label="Місця надання послуг" source="addresses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Повна адреса" source="fullAddress" />
            <TextField label="Назва кліники" source="nameOfClinic" />
            <TextField label="Район" source="district.name" />
            <BooleanField label="Головна адреса" source="isPrimary" />
            <FunctionField
              source="location"
              render={record => (
                <a
                  className="text-primary-500"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.google.com/maps/search/?api=1&query=${record.latitude},${record.longitude}`}
                >
                  Локація на Google карті
                </a>
              )}
              label="На карті"
            />
          </Datagrid>
        </ArrayField>
        <WrapperField label="Графік роботи">
          <WorkTimeShow />
        </WrapperField>
        <ArrayField label="Типи терапій" source="supportFocuses">
          <Datagrid bulkActionButtons={false}>
            <TextField label="Тип" source="therapy.title" />
            <TextField label="Ціна" source="price" />
            <ArrayField label="Запити" source="requests">
              <SingleFieldList linkType={false} className="p-3">
                <ChipField source="name" size="small" />
              </SingleFieldList>
            </ArrayField>
          </Datagrid>
        </ArrayField>
        <BooleanField label="Безкоштовний прийом" source="isFreeReception" />
        <BooleanField label="Активний/Неактивний" source="isActive" />
        <TextField label="Опис" source="description" />
        <TextField label="Номер телефону" source="phone" />
        <TextField source="email" />
        <TextField label="Вебсайт" source="website" />
        <TextField label="Instagram" source="instagram" />
        <TextField label="Facebook" source="facebook" />
        <TextField label="YouTube" source="youtube" />
        <TextField label="LinkedIn" source="linkedin" />
        <TextField label="TikTok" source="tiktok" />
        <TextField label="Viber" source="viber" />
        <TextField label="Telegram" source="telegram" />
      </SimpleShowLayout>
    </Show>
  );
}
