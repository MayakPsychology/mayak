import ky from 'ky';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const APPLICATION_SUCCESS_MESSAGE = 'Дякуємо! Вашу заявку надіслано. Ми зв’яжемося з вами найближчим часом.';
const APPLICATION_ERROR_MESSAGE = 'Не вдалося надіслати заявку. Спробуйте ще раз пізніше.';

const toFormData = data => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach(file => formData.append(key, file));
      return;
    }
    formData.append(key, JSON.stringify(value ?? null));
  });
  return formData;
};

export const useApplicationSubmit = endpoint => {
  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: data => ky.post(endpoint, { body: toFormData(data), timeout: 30000 }).json(),
    onSuccess: () => toast.success(APPLICATION_SUCCESS_MESSAGE),
    onError: async error => {
      const body = await error.response?.json().catch(() => null);
      const detail = Object.values(body?.data ?? {})
        .flat()
        .find(value => typeof value === 'string');
      toast.error(detail || APPLICATION_ERROR_MESSAGE);
    },
  });

  return { submit: mutate, isPending, isSuccess, reset };
};
