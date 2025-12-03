'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { specialistDefaultValues } from '@/app/config/application/specialistData';
import { PillButton } from '../../PillButton';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';

export function SpecialistApplicationWizard({ dicts }) {
  const { clientCategories, specializations, specializationMethods, districts, therapies, requests } = dicts;

  const [step, setStep] = useState(1);
  const methods = useForm({
    defaultValues: specialistDefaultValues,
    mode: 'onChange',
  });
  const onSubmit = data => {
    // eslint-disable-next-line no-console
    console.clear();
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div>
      <p>Specialist Wizard Component</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 1 && <Step1 districts={districts} />}
          {step === 2 && <Step2 clientCategories={clientCategories} />}
          {step === 3 && <Step3 specializations={specializations} specializationMethods={specializationMethods} />}
          {step === 4 && <Step4 therapies={therapies} requests={requests} />}

          {/* Step4 */}
          <div className="flex justify-between">
            <PillButton
              variant="outlined"
              colorVariant="blue"
              aria-label="Click to go to the previous step"
              onClick={() => setStep(step - 1)}
            >
              Назад
            </PillButton>
            <PillButton
              variant="filled"
              colorVariant="blue"
              aria-label="Click to go to the next step"
              onClick={() => setStep(step + 1)}
            >
              Далі
            </PillButton>
          </div>
          <PillButton type="submit" onClick={methods.handleSubmit(onSubmit)}>
            Submit
          </PillButton>
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
