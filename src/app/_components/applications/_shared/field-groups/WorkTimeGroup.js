import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { TextInputField } from '@/app/_components/InputFields';

export function WorkTimeGroup() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields } = useFieldArray({ name: 'workTime' });

  return (
    <fieldset>
      <legend className="text-lg mb-4 font-semibold">Графік роботи</legend>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="relative mb-8">
            <div className="grid grid-cols-1 gap-16 sm:grid-cols-3">
              <input type="hidden" {...register(`workTime.${index}.weekDay`)} />
              <p className="self-center text-p4 font-medium md:text-p3">{field.weekDay}</p>
              <TextInputField
                {...register(`workTime.${index}.time`)}
                placeholder="Час роботи"
                hasError={Boolean(errors?.workTime?.[index]?.time)}
              />
              <Controller
                name={`workTime.${index}.isDayOff`}
                control={control}
                render={({ field: ctrlField }) => (
                  <select
                    name={ctrlField.name}
                    ref={ctrlField.ref}
                    onBlur={ctrlField.onBlur}
                    value={String(ctrlField.value ?? true)}
                    onChange={e => ctrlField.onChange(e.target.value === 'true')}
                    className="gap-3 rounded-full border-[1px] border-gray-600 px-4 py-3 text-p4 focus-within:border-primary-500 md:text-p3"
                  >
                    <option value="true">Вихідний</option>
                    <option value="false">Робочий</option>
                  </select>
                )}
              />
            </div>
            {errors?.workTime?.[index]?.time?.message && (
              <p className="absolute left-0 mt-1 text-[12px] font-semibold text-system-error lg:text-p4">
                {errors.workTime[index].time.message}
              </p>
            )}
          </div>
        ))}
      </div>
      {errors.workTime?.message && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">{errors.workTime.message}</p>
      )}
    </fieldset>
  );
}
