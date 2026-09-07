import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { cn } from '@utils/cn';
import { FieldHint, TimeRangeField } from '../fields';

const pill =
  'w-full rounded-lg border border-primary-400/40 bg-primary-300 px-3 py-2 text-p4 font-bold text-primary-800 md:text-p3';

export function WorkTimeGroup() {
  const {
    register,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();
  const { fields } = useFieldArray({ name: 'workTime' });

  return (
    <fieldset>
      <legend className="mb-2 text-p2 font-bold text-primary-900">
        Графік роботи <span className="text-system-error">*</span>
      </legend>
      <FieldHint>У форматі: пн 10:00-18:00, вт 10:00-18:00 і т.д.</FieldHint>
      <FieldHint>Зазначте всі робочі дні та години.</FieldHint>

      <div className="mt-4">
        {fields.map((field, index) => {
          const timeError = errors?.workTime?.[index]?.time;

          return (
            <div key={field.id} className="mb-4">
              <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">
                <input type="hidden" {...register(`workTime.${index}.weekDay`)} />
                <p className={cn(pill, 'text-center lowercase')}>{field.weekDay}</p>
                <Controller
                  name={`workTime.${index}.time`}
                  control={control}
                  render={({ field: ctrlField }) => (
                    <TimeRangeField
                      label="час роботи"
                      className={pill}
                      value={ctrlField.value ?? ''}
                      hasError={Boolean(timeError)}
                      onChange={time => {
                        ctrlField.onChange(time);
                        // filling in hours means the day is a working one
                        setValue(`workTime.${index}.isDayOff`, false);
                        trigger(`workTime.${index}`);
                      }}
                    />
                  )}
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
                      onChange={event => {
                        const isDayOff = event.target.value === 'true';
                        ctrlField.onChange(isDayOff);
                        // a day off cannot keep working hours
                        if (isDayOff) setValue(`workTime.${index}.time`, null);
                        trigger(`workTime.${index}`);
                      }}
                      className={cn(pill, 'pr-8 lowercase')}
                    >
                      <option value="true">Вихідний</option>
                      <option value="false">Робочий</option>
                    </select>
                  )}
                />
              </div>
              {timeError?.message && (
                <p className="mt-1 text-[12px] font-semibold text-system-error lg:text-p4">{timeError.message}</p>
              )}
            </div>
          );
        })}
      </div>
      {errors.workTime?.message && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
          {errors.workTime.message}
        </p>
      )}
    </fieldset>
  );
}
