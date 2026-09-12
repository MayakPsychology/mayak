'use client';

import { useFormContext } from 'react-hook-form';
import { FieldHeading, TextAreaField } from './fields';

export function ApplicationFinalStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <fieldset className="flex w-full flex-col gap-6">
      <legend className="text-p1 font-bold text-primary-900">Останній розділ</legend>
      <p className="text-p3 text-primary-900">
        Ми вдячні Вам за зацікавленість у співпраці з нашим проєктом! У разі необхідності уточнення інформації, ми Вам
        зателефонуємо/напишемо.
      </p>

      <div>
        <FieldHeading>
          Якщо у Вас є пропозиції, зауваження до форми, платформи або бажання залишити коментар на іншу тему, Ви можете
          зробити це тут.
        </FieldHeading>
        <TextAreaField name="feedback" hints={['Це не є обов’язково.']} placeholder="Ваша відповідь" maxLength={2000} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-p4 text-primary-900 md:text-p3">
          <input type="checkbox" className="mt-1 accent-primary-500" {...register('consent')} />
          Я даю згоду на обробку та публікацію даних на платформі &quot;Маяк&quot;
        </label>
        {errors?.consent?.message && (
          <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
            {errors.consent.message}
          </p>
        )}
      </div>
    </fieldset>
  );
}
