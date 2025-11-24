'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PillButton } from '../../PillButton';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

const specialistDefaultValues = {
  firstName: '',
  lastName: '',
  secondName: '',
  gender: '',
  formatOfWork: '',
  phone: '',
  email: '',
  website: '',
  districtIds: [],
  addresses: '',
  yearsOfExperience: '',
  isFreeReception: false,
  workTime: [],
  socialLinks: {
    instagram: '',
    facebook: '',
    telegram: '',
    youtube: '',
    tiktok: '',
  },
  description: '',
  clientsWorkingWith: [],
  clientsWorkingWithAdditional: '',
  clientsNotWorkingWith: [],
  clientsNotWorkingWithAdditional: '',
};

export function SpecialistApplicationWizard() {
  const [step, setStep] = useState(1);
  const methods = useForm({
    defaultValues: specialistDefaultValues,
    mode: 'onChange',
  });
  // const onSubmit = data => console.log(data);

  return (
    <div>
      <p>Specialist Wizard Component</p>

      <FormProvider {...methods}>
        <form
        // onSubmit={methods.handleSubmit(onSubmit)}
        >
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {/* Step3 */}
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
          <PillButton
            type="submit"
            // onClick={methods.handleSubmit(onSubmit)}
          >
            Submit
          </PillButton>
        </form>
      </FormProvider>
    </div>
  );
}
