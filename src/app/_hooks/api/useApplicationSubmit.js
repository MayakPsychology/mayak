import ky from 'ky';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const APPLICATION_SUCCESS_MESSAGE = 'Дякуємо! Вашу заявку надіслано. Ми зв’яжемося з вами найближчим часом.';
const APPLICATION_ERROR_MESSAGE = 'Не вдалося надіслати заявку. Спробуйте ще раз пізніше.';

const isFileList = value => Array.isArray(value) && value[0] instanceof File;

const extractFiles = (value, path, files) => {
  if (isFileList(value)) {
    files.push([path, value]);
    return undefined;
  }

  if (Array.isArray(value)) return value.map((item, index) => extractFiles(item, `${path}.${index}`, files));

  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, extractFiles(item, path ? `${path}.${key}` : key, files)]),
    );
  }

  return value;
};

export const toFormData = data => {
  const formData = new FormData();
  const files = [];
  const payload = extractFiles(data, '', files);

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined) return;
    formData.append(key, JSON.stringify(value));
  });
  files.forEach(([path, list]) => list.forEach(file => formData.append(path, file)));

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
