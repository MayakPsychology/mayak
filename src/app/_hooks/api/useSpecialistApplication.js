import ky from 'ky';
import { useMutation } from '@tanstack/react-query';

const submitApplication = async formData =>
  ky
    .post('/api/specialist', {
      body: formData, // если FormData, не нужно JSON.stringify
    })
    .json();

export const useSpecialistApplication = () => {
  const { mutate: submitForm } = useMutation({
    mutationFn: formData => submitApplication(formData),
  });

  const onSubmit = data => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
      }
    });
    submitForm(formData);
  };

  return {
    submit: onSubmit,
  };
};
