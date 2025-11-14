'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { PillButton } from '../../PillButton';

const specialistDefaultValues = {
  firstName: '',
  lastName: '',
  secondName: '',
  gender: '',
  formatOfWork: '',
  email: '',
  districtIds: [],
  addresses: '',
  description: '',
};

export function SpecialistApplicationWizard() {
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
          {/* Step1 */}
          {/* Step2 */}
          {/* Step3 */}
          {/* Step4 */}
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
