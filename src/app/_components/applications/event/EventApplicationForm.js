'use client';

import PropTypes from 'prop-types';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventFormat, EventPriceFormat } from '@prisma/client';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { getChoicesList } from '@/app/(admin)/admin/_utils/common';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';
import { TextArea } from '@/app/_components/TextArea';
import { PillButton } from '@/app/_components/PillButton';
import { useEventApplication } from '@/app/_hooks';
import { eventDefaultValues } from '@/app/config/application';
import { eventApplicationSchema } from '@/lib/validationSchemas/applications/eventApplicationSchema';
import { ApplicationSuccess } from '../_shared';

const errorClass = 'ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4';

function RadioGroup({ name, title, choices, control, error }) {
  return (
    <div>
      <h3 className="text-base mb-2 block font-medium">
        {title} <span className="text-red-500">*</span>
      </h3>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div>
            {choices.map(choice => (
              <CheckBox
                key={choice.id}
                name={name}
                type="radio"
                value={choice.id}
                text={choice.name}
                checked={field.value === choice.id}
                onBlur={field.onBlur}
                onChange={() => field.onChange(choice.id)}
              />
            ))}
          </div>
        )}
      />
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  choices: PropTypes.array.isRequired,
  control: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export function EventApplicationForm() {
  const methods = useForm({
    defaultValues: eventDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(eventApplicationSchema),
  });

  const {
    control,
    register,
    formState: { errors },
  } = methods;

  const { submit, isPending, isSuccess } = useEventApplication();

  const format = useWatch({ control, name: 'format' });
  const priceType = useWatch({ control, name: 'priceType' });

  const formatChoices = getChoicesList(Object.values(EventFormat), FormTranslations.eventFormat);
  const priceChoices = getChoicesList(Object.values(EventPriceFormat), FormTranslations.eventPriceFormat);

  if (isSuccess) return <ApplicationSuccess />;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-p2 font-bold text-primary-700 lg:text-h4">Заявка на подію</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => submit(data))} noValidate>
          <fieldset className="flex w-full flex-col gap-10">
            <TextInputField
              {...register('title')}
              placeholder="Назва події"
              required
              error={errors?.title?.message}
              additionalContainerStyle="bg-other-white"
            />
            <TextInputField
              {...register('organizerName')}
              placeholder="Організатор події"
              required
              error={errors?.organizerName?.message}
              additionalContainerStyle="bg-other-white"
            />
            <TextInputField
              {...register('eventDate')}
              type="datetime-local"
              placeholder="Дата події"
              required
              error={errors?.eventDate?.message}
              additionalContainerStyle="bg-other-white"
            />

            <RadioGroup
              name="priceType"
              title="Вартість події"
              choices={priceChoices}
              control={control}
              error={errors?.priceType?.message}
            />
            {priceType && priceType !== EventPriceFormat.FREE && (
              <TextInputField
                {...register('price')}
                type="number"
                min={0}
                step={1}
                placeholder="Вартість, грн"
                error={errors?.price?.message}
                additionalContainerStyle="bg-other-white"
              />
            )}

            <RadioGroup
              name="format"
              title="Формат події"
              choices={formatChoices}
              control={control}
              error={errors?.format?.message}
            />
            {format && format !== EventFormat.ONLINE && (
              <TextInputField
                {...register('address')}
                placeholder="Місце проведення"
                required
                error={errors?.address?.message}
                additionalContainerStyle="bg-other-white"
              />
            )}

            <div>
              <label className="text-base mb-2 block font-medium" htmlFor="notes">
                Опис події <span className="text-red-500">*</span>
              </label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    value={field.value ?? ''}
                    maxLength={350}
                    placeholder="Ваша відповідь"
                    error={errors?.notes?.message}
                  />
                )}
              />
            </div>

            <TextInputField
              {...register('link')}
              type="url"
              placeholder="Посилання"
              required
              error={errors?.link?.message}
              additionalContainerStyle="bg-other-white"
            />
          </fieldset>

          <div className="mt-10 flex justify-end">
            <PillButton
              type="submit"
              variant="filled"
              colorVariant="blue"
              aria-label="Надіслати заявку"
              disabled={isPending}
            >
              {isPending ? 'Надсилаємо…' : 'Надіслати заявку'}
            </PillButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
