import { useCallback, useState } from 'react';

// Every .superRefine() wraps the object in another ZodEffects, so unwrap until the shape shows up.
// Missing it hands trigger() an empty field list, which passes unconditionally.
export const getStepFields = step => {
  let { schema } = step;
  while (schema && !schema.shape && schema._def?.schema) schema = schema._def.schema;
  return schema?.shape ? Object.keys(schema.shape) : [];
};

export const useFormWizard = (steps, methods) => {
  const [index, setIndex] = useState(0);
  const { trigger } = methods;

  // Steps can disappear underneath us — the specialist flow adds one slide per ticked
  // speciality — so never index past the end.
  const safeIndex = Math.min(index, steps.length - 1);
  const currentStep = steps[safeIndex];
  const isFirst = safeIndex === 0;
  const isLast = safeIndex === steps.length - 1;

  const next = useCallback(async () => {
    const isValid = await trigger(getStepFields(currentStep));
    if (isValid && !isLast) setIndex(prev => prev + 1);
  }, [currentStep, isLast, trigger]);

  const back = useCallback(() => setIndex(prev => Math.max(prev - 1, 0)), []);

  const goTo = useCallback(target => setIndex(Math.max(target, 0)), []);

  return { index: safeIndex, total: steps.length, next, back, goTo, currentStep, isFirst, isLast };
};
