'use client';

import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOrganizationApplication } from '@/app/_hooks';
import { organizationDefaultValues } from '@/app/config/application';
import {
  organizationApplicationFullSchema,
  organizationApplicationStep1Schema as step1Schema,
  organizationApplicationStep2Schema as step2Schema,
  organizationApplicationStep3Schema as step3Schema,
  organizationApplicationStep4Schema as step4Schema,
  organizationApplicationStep5Schema as step5Schema,
  organizationSubmitterContactSchema,
} from '@/lib/validationSchemas/applications/organizationApplicationSchema';
import { ApplicationWizard, SubmitterContactStep } from '../_shared';
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
    { id: 'step1', progress: 0, component: <Step1 organizationTypes={organizationTypes} />, schema: step1Schema },
    { id: 'step2', progress: 1, component: <Step2 cities={cities} />, schema: step2Schema },
    {
      id: 'step3',
      progress: 2,
      component: <Step3 clientCategories={clientCategories} specializations={specializations} />,
      schema: step3Schema,
    },
    { id: 'step4', progress: 3, component: <Step4 therapies={therapies} />, schema: step4Schema },
    { id: 'step5', progress: 4, component: <Step5 />, schema: step5Schema },
    {
      id: 'submitter',
      progress: 4,
      isFilled: true,
      component: <SubmitterContactStep />,
      schema: organizationSubmitterContactSchema,
    },
  ];

  return (
    <ApplicationWizard
      title="Заявка організації"
      steps={steps}
      methods={methods}
      defaultValues={organizationDefaultValues}
      submit={submit}
      isPending={isPending}
      isSuccess={isSuccess}
    />
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
