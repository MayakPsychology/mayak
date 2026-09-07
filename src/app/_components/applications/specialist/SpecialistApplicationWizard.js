'use client';

import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSpecialistApplication } from '@/app/_hooks';
import { specialistDefaultValues } from '@/app/config/application/specialistData';
import { useFormWizard } from '@/app/_hooks/useFormWizard';
import {
  specialistApplicationFullSchema,
  specialistApplicationStep1Schema as step1Schema,
  specialistApplicationStep2Schema as step2Schema,
  specialistApplicationStep3Schema as step3Schema,
  specialistApplicationStep4Schema as step4Schema,
  specialistApplicationStep5Schema as step5Schema,
} from '@/lib/validationSchemas/applications/specialistApplicationSchema';
import { ApplicationSuccess, WizardHeader, WizardNavigation } from '../_shared';
import { Step1, Step2, Step3, Step4, Step5 } from './steps';

export function SpecialistApplicationWizard({ dicts }) {
  const { clientCategories, specializations, specializationMethods, cities, therapies } = dicts;

  const methods = useForm({
    defaultValues: specialistDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(specialistApplicationFullSchema),
  });

  const { submit, isPending, isSuccess } = useSpecialistApplication();

  const steps = [
    { id: 1, component: <Step1 />, schema: step1Schema },
    { id: 2, component: <Step2 cities={cities} />, schema: step2Schema },
    { id: 3, component: <Step3 clientCategories={clientCategories} />, schema: step3Schema },
    {
      id: 4,
      component: <Step4 specializations={specializations} specializationMethods={specializationMethods} />,
      schema: step4Schema,
    },
    { id: 5, component: <Step5 therapies={therapies} />, schema: step5Schema },
  ];

  const { index, total, next, back, currentStep, isLast } = useFormWizard(steps, methods);

  if (isSuccess) return <ApplicationSuccess />;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">Заявка спеціаліста</h1>
      <WizardHeader index={index} total={total} onBack={back} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => submit(data))} noValidate>
          {currentStep.component}
          <WizardNavigation
            isLast={isLast}
            isPending={isPending}
            onClear={() => methods.reset(specialistDefaultValues)}
            onNext={next}
          />
        </form>
      </FormProvider>
    </div>
  );
}

SpecialistApplicationWizard.propTypes = {
  dicts: PropTypes.shape({
    cities: PropTypes.array.isRequired,
    clientCategories: PropTypes.array.isRequired,
    specializations: PropTypes.array.isRequired,
    specializationMethods: PropTypes.array.isRequired,
    therapies: PropTypes.array.isRequired,
  }).isRequired,
};
