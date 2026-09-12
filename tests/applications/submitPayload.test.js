import { describe, expect, it } from 'vitest';
import { toFormData } from '@/app/_hooks/api/useApplicationSubmit';
import { formDataToAttachments, formDataToObject } from '@/lib/formData';

const file = name => new File([new Uint8Array(10)], name, { type: 'application/pdf' });

const application = () => ({
  firstName: 'Іван',
  educationFiles: [file('diploma.pdf')],
  specializationAdditionalInfo: [
    { specialization: 'Психолог', supportingFiles: [file('first.pdf')] },
    { specialization: 'Психотерапевт', supportingFiles: [file('second.pdf')] },
  ],
});

describe('toFormData', () => {
  it('sends files nested inside a speciality entry as real uploads', async () => {
    const attachments = await formDataToAttachments(toFormData(application()));

    expect(attachments.map(attachment => attachment.filename)).toEqual([
      'educationFiles-diploma.pdf',
      'supportingFiles-1-first.pdf',
      'supportingFiles-2-second.pdf',
    ]);
  });

  it('keeps the uploads out of the parsed payload but keeps the entries', () => {
    const parsed = formDataToObject(toFormData(application()));

    expect(parsed.firstName).toBe('Іван');
    expect('educationFiles' in parsed).toBe(false);
    expect(parsed.specializationAdditionalInfo.every(entry => !('supportingFiles' in entry))).toBe(true);
    expect(parsed.specializationAdditionalInfo.map(entry => entry.specialization)).toEqual([
      'Психолог',
      'Психотерапевт',
    ]);
  });

  it('does not flatten a Date into an empty object', () => {
    const eventDate = new Date('2026-10-01T18:00:00.000Z');
    const parsed = formDataToObject(toFormData({ eventDate }));

    expect(parsed.eventDate).toBe(eventDate.toISOString());
  });
});
