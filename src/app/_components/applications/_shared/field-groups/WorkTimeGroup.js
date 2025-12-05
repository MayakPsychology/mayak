import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { TextInputField } from '@/app/_components/InputFields';
import { WEEKDAYS_TRANSLATION } from '@/app/(admin)/admin/_lib/consts';

export function WorkTimeGroup() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields } = useFieldArray({
    name: 'workTime',
  });

  return (
    <fieldset>
      <legend className="text-lg mb-4 font-semibold">Графік роботи</legend>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="relative mb-8">
            <div className="grid grid-cols-1 gap-16 sm:grid-cols-3">
              <TextInputField
                {...register(`workTime.${index}.workTime`)}
                value={field.weekDay}
                placeholder={WEEKDAYS_TRANSLATION[field.weekDay]}
                hasError={errors?.workTime?.[index]?.workTime}
                readOnly
              />
              <TextInputField
                {...register(`workTime.${index}.time`)}
                placeholder="Час роботи"
                hasError={errors?.workTime?.[index]?.time}
              />
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
            {errors?.workTime?.[index] && (
              <p className="absolute left-0 mt-1 text-[12px] font-semibold text-system-error lg:text-p4">
                {(() => {
                  const rowErrors = errors.workTime[index];
                  if (rowErrors.workTime?.message) return rowErrors.workTime.message;
                  if (rowErrors.time?.message) return rowErrors.time.message;
                  if (rowErrors.isDayOff?.message) return rowErrors.isDayOff.message;
                  return null;
                })()}
              </p>
            )}
          </div>
        ))}
      </div>
      {errors.workTime?._errors?.length > 0 && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
          {errors.workTime._errors[0]}
        </p>
      )}
    </fieldset>
  );
}
