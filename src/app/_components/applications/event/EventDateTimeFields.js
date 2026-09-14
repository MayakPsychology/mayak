'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@utils/cn';
import { FieldHeading, TIME_PILL_CLASS, TimeField } from '../_shared/fields';

const errorClass = 'ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4';

const split = value => {
  const [day = '', time = ''] = String(value ?? '').split('T');
  return { day, time };
};

/**
 * The mocks ask for the date and the time separately; the schema keeps one
 * "YYYY-MM-DDTHH:mm" value, so each control writes into its half of it.
 * The time uses the same clock dial as the work schedule.
 */
export function EventDateTimeFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="eventDate"
      control={control}
      render={({ field }) => {
        const { day, time } = split(field.value);
        const join = (nextDay, nextTime) => field.onChange(nextDay || nextTime ? `${nextDay}T${nextTime}` : '');

        return (
          <>
            <div>
              <FieldHeading>Дата події</FieldHeading>
              <label className="mb-2 block text-p3 font-bold text-primary-900" htmlFor="event-date">
                Виберіть дату
              </label>
              <input
                id="event-date"
                type="date"
                value={day}
                onBlur={field.onBlur}
                onChange={event => join(event.target.value, time)}
                className="rounded-xl border border-primary-500 bg-other-white px-4 py-3 text-p3 text-primary-900"
              />
            </div>
            <div>
              <FieldHeading>Час події</FieldHeading>
              <TimeField
                label="__ : __"
                value={time}
                onChange={nextTime => join(day, nextTime)}
                hasError={Boolean(errors?.eventDate)}
                className={cn(TIME_PILL_CLASS, 'w-40 text-center')}
              />
              {errors?.eventDate?.message && <p className={errorClass}>{errors.eventDate.message}</p>}
            </div>
          </>
        );
      }}
    />
  );
}
