import { useState } from 'react';

export const useFormWizard = (steps, methods) => {
  const [index, setIndex] = useState(0);
  const { trigger } = methods;

  const currentStep = steps[index];

  const next = async () => {
    const fields = Object.keys(currentStep.schema.shape);
    const isValid = await trigger(fields);
    if (isValid && index < steps.length - 1) setIndex(prev => prev + 1);
  };

  const back = () => setIndex(prev => prev - 1);

  return { index, next, back, currentStep };
};

// Автосохарение черновика в localStorage при изменении данных формы.
// Десериализация данных из localStorage при инициализации формы для восстановления состояния.

// useEffect(() => {
//   const subscription = methods.watch(values => {
//     localStorage.setItem('specialistDraft', JSON.stringify(values));
//   });

//   return () => subscription.unsubscribe();
// }, [methods]);
