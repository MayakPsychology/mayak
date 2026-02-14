'use client';

// import { useState } from 'react';
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
  // specialistApplicationSchema,
} from '@/lib/validationSchemas/applications/specialistApplicationSchema';
import { PillButton } from '../../PillButton';
import { Step1, Step2, Step3, Step4, Step5 } from './steps';

export function SpecialistApplicationWizard({ dicts }) {
  const { clientCategories, specializations, specializationMethods, districts, therapies, requests } = dicts;

  // const [step, setStep] = useState(1);
  const methods = useForm({
    defaultValues: specialistDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(specialistApplicationFullSchema),
  });

  const { submit } = useSpecialistApplication();

  const onSubmit = data => {
    submit(data);
    // eslint-disable-next-line no-console
    console.clear();
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const steps = [
    { id: 1, component: <Step1 />, schema: step1Schema },
    { id: 2, component: <Step2 districts={districts} />, schema: step2Schema },
    { id: 3, component: <Step3 clientCategories={clientCategories} />, schema: step3Schema },
    {
      id: 4,
      component: <Step4 specializations={specializations} specializationMethods={specializationMethods} />,
      schema: step4Schema,
    },
    { id: 5, component: <Step5 therapies={therapies} requests={requests} />, schema: step5Schema },
  ];

  const { index, next, back, currentStep } = useFormWizard(steps, methods);

  return (
    <div>
      <p>Specialist Wizard Component</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {currentStep.component}

          <div className="flex justify-between">
            <PillButton
              variant="outlined"
              colorVariant="blue"
              aria-label="Click to go to the previous step"
              onClick={back}
            >
              Назад
            </PillButton>
            {index < steps.length - 1 ? (
              <PillButton variant="filled" colorVariant="blue" aria-label="Click to go to the next step" onClick={next}>
                Далі
              </PillButton>
            ) : (
              <PillButton type="submit">Submit</PillButton>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

SpecialistApplicationWizard.propTypes = {
  dicts: PropTypes.shape({
    districts: PropTypes.array.isRequired,
    clientCategories: PropTypes.array.isRequired,
    specializations: PropTypes.array.isRequired,
    specializationMethods: PropTypes.array.isRequired,
    therapies: PropTypes.array.isRequired,
    requests: PropTypes.array.isRequired,
  }).isRequired,
};
