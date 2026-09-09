'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventFormat, EventPriceFormat } from '@prisma/client';
import { TextInputField } from '@/app/_components/InputFields';
import { useEventApplication } from '@/app/_hooks';
import { eventDefaultValues } from '@/app/config/application';
import { EVENT_FORMAT_OPTIONS, EVENT_PRICE_OPTIONS } from '@/app/config/application/choices';
import {
  eventApplicationSchema,
  eventApplicationStepSchema,
  eventSubmitterContactSchema,
} from '@/lib/validationSchemas/applications/eventApplicationSchema';
import { ApplicationWizard, SECTION_NOTE, StepHeader, SubmitterContactStep } from '../_shared';
import { FieldHeading, FileUploadField, RadioGroupField, TextAreaField } from '../_shared/fields';
import { EventDateTimeFields } from './EventDateTimeFields';

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

  const eventStep = (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader
        title="Про подію"
        intro="У цьому розділі знаходяться питання, які стосуються загальної інформації про подію."
        note={SECTION_NOTE}
      />

      <div>
        <FieldHeading>Загальна інформація</FieldHeading>
        <div className="flex flex-col gap-4">
          <TextInputField
            {...register('organizerName')}
            placeholder="Організатор події"
            error={errors?.organizerName?.message}
            additionalContainerStyle="bg-other-white"
          />
          <TextInputField
            {...register('title')}
            placeholder="Назва події"
            error={errors?.title?.message}
            additionalContainerStyle="bg-other-white"
          />
        </div>
      </div>

      <EventDateTimeFields />

      <div>
        <RadioGroupField
          name="priceType"
          label="Вартість події"
          hints={['якщо подія платна, вкажіть суму в "інше"']}
          options={EVENT_PRICE_OPTIONS}
        />
        {priceType && priceType !== EventPriceFormat.FREE && (
          <div className="ml-9 mt-2">
            <TextInputField
              {...register('price')}
              type="number"
              min={0}
              step={1}
              placeholder="Вартість, грн"
              absolute={false}
              error={errors?.price?.message}
              additionalContainerStyle="bg-other-white"
            />
          </div>
        )}
      </div>

      <RadioGroupField name="format" label="Формат події" options={EVENT_FORMAT_OPTIONS} />

      {format && format !== EventFormat.ONLINE && (
        <TextAreaField
          name="address"
          label="Місце проведення для офлайн події"
          placeholder="Адреса"
          maxLength={128}
        />
      )}

      <TextAreaField
        name="notes"
        label="Опис події"
        hints={['коротко розкажіть про суть події']}
        placeholder="Про подію"
        maxLength={350}
      />

      <TextAreaField
        name="link"
        label="Посилання на подію у соц. мережах або на сайті"
        placeholder="Соціальні мережі"
        maxLength={500}
      />

      <FileUploadField
        name="eventFiles"
        label="Додайте афішу або інші матеріали події"
        hints={['Файли надходять лише на пошту адміністрації.']}
      />
    </fieldset>
  );

  const steps = [
    { id: 'event', component: eventStep, schema: eventApplicationStepSchema },
    { id: 'submitter', component: <SubmitterContactStep />, schema: eventSubmitterContactSchema },
  ];

  return (
    <ApplicationWizard
      title="Заявка на подію"
      steps={steps}
      methods={methods}
      defaultValues={eventDefaultValues}
      submit={submit}
      isPending={isPending}
      isSuccess={isSuccess}
    />
  );
}
