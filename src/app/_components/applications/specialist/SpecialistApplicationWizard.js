'use client';

import { useForm, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSpecialistApplication } from '@/app/_hooks';
import { specialistDefaultValues } from '@/app/config/application/specialistData';
import {
  specialistApplicationFullSchema,
  specialistApplicationStep1Schema as step1Schema,
  specialistApplicationStep2Schema as step2Schema,
  specialistApplicationStep3Schema as step3Schema,
  specialistApplicationStep4Schema as step4Schema,
  specialistApplicationStep5Schema as step5Schema,
  specializationDetailsSchema,
  finalStepSchema,
} from '@/lib/validationSchemas/applications/specialistApplicationSchema';
import { ApplicationFinalStep, ApplicationWizard } from '../_shared';
import { SpecializationDetailStep, Step1, Step2, Step3, Step4, Step5 } from './steps';

export function SpecialistApplicationWizard({ dicts }) {
  const { clientCategories, specializations, specializationMethods, cities, therapies } = dicts;

  const methods = useForm({
    defaultValues: specialistDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(specialistApplicationFullSchema),
  });

  const { submit, isPending, isSuccess } = useSpecialistApplication();

  // One extra slide per ticked speciality, in the order they were ticked.
  const chosenSpecializations = useWatch({ control: methods.control, name: 'specializationAdditionalInfo' }) ?? [];

  const steps = [
    { id: 'step1', progress: 0, component: <Step1 />, schema: step1Schema },
    { id: 'step2', progress: 1, component: <Step2 cities={cities} />, schema: step2Schema },
    { id: 'step3', progress: 2, component: <Step3 clientCategories={clientCategories} />, schema: step3Schema },
    { id: 'step4', progress: 3, component: <Step4 specializations={specializations} />, schema: step4Schema },
    ...chosenSpecializations.map((entry, index) => ({
      id: `specialization-${entry.specializationId}`,
      component: (
        <SpecializationDetailStep
          specialization={entry.specialization}
          specializationId={entry.specializationId}
          specializationMethods={specializationMethods}
          index={index}
        />
      ),
      schema: specializationDetailsSchema,
    })),
    { id: 'step5', progress: 4, component: <Step5 therapies={therapies} />, schema: step5Schema },
    { id: 'final', progress: 4, isFilled: true, component: <ApplicationFinalStep />, schema: finalStepSchema },
  ];

  return (
    <ApplicationWizard
      title="Заявка спеціаліста"
      steps={steps}
      methods={methods}
      defaultValues={specialistDefaultValues}
      submit={submit}
      isPending={isPending}
      isSuccess={isSuccess}
    />
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
