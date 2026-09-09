import { describe, expect, it } from 'vitest';
import { formDataToAttachments, formDataToObject } from '@/lib/formData';

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

const file = (name, bytes = 10) => new File([new Uint8Array(bytes)], name, { type: 'application/pdf' });

const withFiles = files => {
  const formData = build([['education', JSON.stringify('Диплом')]]);
  files.forEach(uploaded => formData.append('educationFiles', uploaded));
  return formData;
};

describe('formDataToAttachments', () => {
  it('keeps the uploads out of the parsed payload', () => {
    expect(formDataToObject(withFiles([file('diploma.pdf')]))).toEqual({ education: 'Диплом' });
  });

  it('names each attachment after the question it was uploaded under', async () => {
    const [attachment] = await formDataToAttachments(withFiles([file('diploma.pdf')]));

    expect(attachment.filename).toBe('educationFiles-diploma.pdf');
    expect(attachment.content).toHaveLength(10);
  });

  it('rejects uploads over the request body budget', async () => {
    await expect(formDataToAttachments(withFiles([file('big.pdf', 5 * 1024 * 1024)]))).rejects.toThrow();
  });

  it('strips path segments a client could put in the file name', async () => {
    const [attachment] = await formDataToAttachments(withFiles([file('../../etc/passwd.pdf')]));

    expect(attachment.filename).toBe('educationFiles-passwd.pdf');
  });

  it('rejects unsupported formats', async () => {
    await expect(formDataToAttachments(withFiles([file('malware.exe')]))).rejects.toThrow();
  });
});
