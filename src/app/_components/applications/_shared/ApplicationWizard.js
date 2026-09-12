'use client';

import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import ROUTES from '@/app/config/routes';
import { getStepFields, useFormWizard } from '@/app/_hooks/useFormWizard';
import { ApplicationSuccess } from './ApplicationSuccess';
import { WizardHeader } from './WizardHeader';
import { WizardNavigation } from './WizardNavigation';

const firstMessage = node => {
  if (!node || typeof node !== 'object') return null;
  if (typeof node.message === 'string') return node.message;
  return Object.values(node).map(firstMessage).find(Boolean) ?? null;
};

/**
 * Shell shared by the specialist, organization and event flows.
 *
 * A step carries `progress` — the dot it lights up on the bar. Slides the mocks draw
 * without a bar at all (the per-speciality ones, the single event slide) leave it out,
 * and the closing "who filled this in" slide reuses the last dot with the bar full.
 */
export function ApplicationWizard({ title, steps, methods, defaultValues, submit, isPending, isSuccess }) {
  const router = useRouter();
  const { index, next, back, goTo, currentStep, isLast } = useFormWizard(steps, methods);
  const total = Math.max(0, ...steps.map(step => step.progress ?? 0)) + 1;

  const onInvalid = errors => {
    const [name] = Object.keys(errors);
    const stepIndex = steps.findIndex(step => getStepFields(step).includes(name));
    if (stepIndex >= 0) goTo(stepIndex);
    toast.error(firstMessage(errors[name]) ?? 'Перевірте, будь ласка, заповнені поля');
  };
  const hasProgress = currentStep?.progress != null;

  if (isSuccess) return <ApplicationSuccess />;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">{title}</h1>
      <WizardHeader
        index={currentStep?.progress ?? 0}
        total={hasProgress ? total : 1}
        // from the first step the arrow goes back to the "Хто ми?" slide
        onBack={index === 0 ? () => router.push(ROUTES.ADD_NEW, { scroll: false }) : back}
        isFilled={Boolean(currentStep?.isFilled)}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => submit(data), onInvalid)} noValidate>
          {currentStep?.component}
          <WizardNavigation
            isLast={isLast}
            isPending={isPending}
            onClear={() => methods.reset(defaultValues)}
            onNext={next}
          />
        </form>
      </FormProvider>
    </div>
  );
}

ApplicationWizard.propTypes = {
  title: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired,
  methods: PropTypes.object.isRequired,
  defaultValues: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
  isSuccess: PropTypes.bool,
};
