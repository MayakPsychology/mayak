import {
  ArrayField,
  ChipField,
  DateField,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  Show,
  BooleanField,
  NumberField,
  FunctionField,
} from 'react-admin';

export function TherapyShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField label="Тип" source="title" />
        <FunctionField
          source="description"
          label="Опис"
          render={record =>
            record.description
              ? record.description.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))
              : '—'
          }
        />
        <TextField label="Шлях до зображення" source="imagePath" />
        <NumberField label="Пріоритет" source="priority" />
        <NumberField label="Кількість запитів" source="_count.requests" />
        <ArrayField label="Запити" source="requests">
          <SingleFieldList linkType={false}>
            <ChipField source="name" size="small" />
          </SingleFieldList>
        </ArrayField>
        <BooleanField label="Активна\Неактивна" source="isActive" />
        <DateField showTime label="Дата додавання у сервіс" source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
}
