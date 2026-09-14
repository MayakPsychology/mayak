export function formDataToObject(formData) {
  const data = {};

  formData.forEach((value, key) => {
    if (typeof value !== 'string') return;

    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value;
    }
  });

  return data;
}
