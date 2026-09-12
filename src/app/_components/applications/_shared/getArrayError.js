export const getArrayError = (errors, name) => {
  const fieldError = name.split('.').reduce((acc, key) => acc?.[key], errors);
  return fieldError?.root?.message ?? (typeof fieldError?.message === 'string' ? fieldError.message : undefined);
};
