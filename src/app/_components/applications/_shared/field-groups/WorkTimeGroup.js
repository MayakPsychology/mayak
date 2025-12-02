import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { TextInputField } from '@/app/_components/InputFields';
import { WEEKDAYS_TRANSLATION } from '@/app/(admin)/admin/_lib/consts';

export function WorkTimeGroup() {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({
    name: 'workTime',
  });

  return (
    <fieldset>
      <legend className="text-lg mb-4 font-semibold">Графік роботи</legend>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 grid grid-cols-1 gap-16 sm:grid-cols-3">
            <TextInputField
              {...register(`workTime.${index}.weekDay`)}
              value={field.weekDay}
              placeholder={WEEKDAYS_TRANSLATION[field.weekDay]}
              readOnly
            />
            <TextInputField {...register(`workTime.${index}.time`)} placeholder="Час роботи" />
            <Controller
              name={`workTime.${index}.isDayOff`}
              control={control}
              render={({ field: ctrlField }) => (
                <select
                  {...ctrlField}
                  onChange={e => ctrlField.onChange(e.target.value === 'true')}
                  className="gap-3 rounded-full border-[1px] border-gray-600 px-4 py-3 text-p4 focus-within:border-primary-500 md:text-p3"
                >
                  <option value="true">Вихідний</option>
                  <option value="false">Робочий</option>
                </select>
              )}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
