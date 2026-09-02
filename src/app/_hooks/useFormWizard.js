import { useCallback, useState } from 'react';

const getStepFields = step => {
  const shape = step.schema?.shape ?? step.schema?._def?.schema?.shape;
  return shape ? Object.keys(shape) : [];
};

export const useFormWizard = (steps, methods) => {
  const [index, setIndex] = useState(0);
  const { trigger } = methods;

  const currentStep = steps[index];
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;

  const next = useCallback(async () => {
    const isValid = await trigger(getStepFields(currentStep));
    if (isValid && !isLast) setIndex(prev => prev + 1);
  }, [currentStep, isLast, trigger]);

  const back = useCallback(() => setIndex(prev => Math.max(prev - 1, 0)), []);

  return { index, total: steps.length, next, back, currentStep, isFirst, isLast };
};
