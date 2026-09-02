import { describe, expect, it } from 'vitest';
import { formDataToObject } from '@/lib/formData';

const build = entries => {
  const formData = new FormData();
  entries.forEach(([key, value]) => formData.append(key, value));
  return formData;
};

describe('formDataToObject', () => {
  it('round-trips the types the client serialised', () => {
    const result = formDataToObject(
      build([
        ['firstName', JSON.stringify('Іван')],
        ['yearsOfExperience', JSON.stringify(5)],
        ['isFreeReception', JSON.stringify(false)],
        ['surname', JSON.stringify(null)],
        ['addresses', JSON.stringify([{ fullAddress: 'вул. Тестова 1' }])],
      ]),
    );

    expect(result).toEqual({
      firstName: 'Іван',
      yearsOfExperience: 5,
      isFreeReception: false,
      surname: null,
      addresses: [{ fullAddress: 'вул. Тестова 1' }],
    });
  });

  it('keeps a numeric-looking name as a string', () => {
    const result = formDataToObject(build([['firstName', JSON.stringify('123')]]));
    expect(result.firstName).toBe('123');
  });

  it('falls back to the raw value when it is not valid JSON', () => {
    const result = formDataToObject(build([['stray', 'not json']]));
    expect(result.stray).toBe('not json');
  });
});
