import { ArrayInput, NullableBooleanInput, SimpleFormIterator, TextInput, useRecordContext } from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { WEEKDAYS_TRANSLATION } from '@admin/_lib/consts';

export function WorkTimeForm() {
  // we need to have fields for worktime in edit form
  // even if worktime isn't specified and for this we
  // need to mutate record
  const record = useRecordContext();
  if (record?.workTime?.length === 0) {
    record.workTime = Object.values(WEEKDAYS_TRANSLATION).map(weekDay => ({
      weekDay,
      time: null,
      isDayOff: null,
    }));
  }
  return (
    <FormFieldWrapper title="Графік роботи">
      <p>Час роботи введіть у форматі [год: хв початку роботи] - [год: хв кінця роботи]</p>
      <ArrayInput
        source="workTime"
        label={false}
        defaultValue={Object.values(WEEKDAYS_TRANSLATION).map(weekDay => ({
          weekDay,
        }))}
      >
        <SimpleFormIterator disableAdd disableRemove disableReordering inline>
          <TextInput source="weekDay" className="w-28" label={false} inputProps={{ readOnly: true }} />
          <TextInput source="time" label="Час роботи" />
          <NullableBooleanInput
            trueLabel="Так"
            falseLabel="Ні"
            nullLabel="Не зазначено"
            source="isDayOff"
            label="Вихідний"
          />
        </SimpleFormIterator>
      </ArrayInput>
    </FormFieldWrapper>
  );
}
