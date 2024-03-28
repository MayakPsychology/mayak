import { ArrayField, BooleanField, Datagrid, TextField } from 'react-admin';

export function WorkTimeShow() {
  return (
    <ArrayField label="Графік роботи" source="workTime">
      <Datagrid empty="Не зазначено" title="Графік роботи" bulkActionButtons={false}>
        <TextField label="День" source="weekDay" />
        <TextField label="Час" source="time" />
        <BooleanField label="Вихідній" source="isDayOff" />
      </Datagrid>
    </ArrayField>
  );
}
