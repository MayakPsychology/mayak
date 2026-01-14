'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { specialistDefaultValues } from '@/app/config/application/specialistData';
import { specialistApplicationSchema } from '@/lib/validationSchemas/applications/specialistApplicationSchema';
import { PillButton } from '../../PillButton';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { Step5 } from './Step5';

export function SpecialistApplicationWizard({ dicts }) {
  const { clientCategories, specializations, specializationMethods, districts, therapies, requests } = dicts;

  const [step, setStep] = useState(1);
  const methods = useForm({
    defaultValues: specialistDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(specialistApplicationSchema),
  });
  const onSubmit = data => {
    // eslint-disable-next-line no-console
    console.clear();
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const steps = [
    { id: 1, component: <Step1 /> },
    { id: 2, component: <Step2 districts={districts} /> },
    { id: 3, component: <Step3 clientCategories={clientCategories} /> },
    { id: 4, component: <Step4 specializations={specializations} specializationMethods={specializationMethods} /> },
    { id: 5, component: <Step5 therapies={therapies} requests={requests} /> },
  ];

  return (
    <div>
      <p>Specialist Wizard Component</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {steps.find(s => s.id === step)?.component}

          {/* Step4 */}
          <div className="flex justify-between">
            <PillButton
              variant="outlined"
              colorVariant="blue"
              aria-label="Click to go to the previous step"
              onClick={() => setStep(prev => Math.max(prev - 1))}
            >
              Назад
            </PillButton>
            {step < steps.length ? (
              <PillButton
                variant="filled"
                colorVariant="blue"
                aria-label="Click to go to the next step"
                onClick={() => setStep(prev => Math.min(prev + 1, steps.length))}
              >
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
