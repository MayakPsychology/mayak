import { describe, expect, it } from 'vitest';
import { toFormData } from '@/app/_hooks/api/useApplicationSubmit';
import { formDataToObject } from '@/lib/formData';

const uploaded = name => ({
  id: 'local-only',
  url: `https://example.public.blob.vercel-storage.com/${name}`,
  pathname: `applications/${name}`,
  name,
  size: 1024,
});

describe('toFormData', () => {
  it('round-trips uploaded documents nested inside a speciality entry', () => {
    const parsed = formDataToObject(
      toFormData({
        firstName: 'Іван',
        educationFiles: [uploaded('diploma.pdf')],
        specializationAdditionalInfo: [
          { specialization: 'Психолог', supportingFiles: [uploaded('first.pdf')] },
          { specialization: 'Психотерапевт', supportingFiles: [] },
        ],
      }),
    );

    expect(parsed.firstName).toBe('Іван');
    expect(parsed.educationFiles[0].pathname).toBe('applications/diploma.pdf');
    expect(parsed.specializationAdditionalInfo[0].supportingFiles[0].name).toBe('first.pdf');
    expect(parsed.specializationAdditionalInfo[1].supportingFiles).toEqual([]);
  });

  it('does not flatten a Date into an empty object', () => {
    const eventDate = new Date('2026-10-01T18:00:00.000Z');
    expect(formDataToObject(toFormData({ eventDate })).eventDate).toBe(eventDate.toISOString());
  });
});
