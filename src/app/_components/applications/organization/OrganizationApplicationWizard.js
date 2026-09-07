'use client';

import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrganizationApplication } from '@/app/_hooks';
import { organizationDefaultValues } from '@/app/config/application';
import { useFormWizard } from '@/app/_hooks/useFormWizard';
import {
  organizationApplicationFullSchema,
  organizationApplicationStep1Schema as step1Schema,
  organizationApplicationStep2Schema as step2Schema,
  organizationApplicationStep3Schema as step3Schema,
  organizationApplicationStep4Schema as step4Schema,
  organizationApplicationStep5Schema as step5Schema,
} from '@/lib/validationSchemas/applications/organizationApplicationSchema';
import { ApplicationSuccess, WizardHeader, WizardNavigation } from '../_shared';
import { Step1, Step2, Step3, Step4, Step5 } from './steps';

export function OrganizationApplicationWizard({ dicts }) {
  const { clientCategories, specializations, cities, therapies, organizationTypes } = dicts;

  const methods = useForm({
    defaultValues: organizationDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(organizationApplicationFullSchema),
  });

  const { submit, isPending, isSuccess } = useOrganizationApplication();

  const steps = [
    { id: 1, component: <Step1 organizationTypes={organizationTypes} />, schema: step1Schema },
    { id: 2, component: <Step2 cities={cities} />, schema: step2Schema },
    { id: 3, component: <Step3 clientCategories={clientCategories} />, schema: step3Schema },
    { id: 4, component: <Step4 specializations={specializations} />, schema: step4Schema },
    { id: 5, component: <Step5 therapies={therapies} />, schema: step5Schema },
  ];

  const { index, total, next, back, currentStep, isLast } = useFormWizard(steps, methods);

  if (isSuccess) return <ApplicationSuccess />;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">Заявка організації</h1>
      <WizardHeader index={index} total={total} onBack={back} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => submit(data))} noValidate>
          {currentStep.component}
          <WizardNavigation
            isLast={isLast}
            isPending={isPending}
            onClear={() => methods.reset(organizationDefaultValues)}
            onNext={next}
          />
        </form>
      </FormProvider>
    </div>
  );
}

OrganizationApplicationWizard.propTypes = {
  dicts: PropTypes.shape({
    cities: PropTypes.array.isRequired,
    clientCategories: PropTypes.array.isRequired,
    specializations: PropTypes.array.isRequired,
    therapies: PropTypes.array.isRequired,
    organizationTypes: PropTypes.array.isRequired,
  }).isRequired,
};
