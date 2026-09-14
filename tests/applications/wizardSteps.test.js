import { describe, expect, it } from 'vitest';
import { getStepFields } from '@/app/_hooks/useFormWizard';
import {
  organizationApplicationStep4Schema,
  organizationApplicationStep5Schema,
} from '@/lib/validationSchemas/applications/organizationApplicationSchema';
import {
  specialistApplicationStep2Schema,
  specialistApplicationStep5Schema,
} from '@/lib/validationSchemas/applications/specialistApplicationSchema';
import { eventApplicationStepSchema } from '@/lib/validationSchemas/applications/eventApplicationSchema';

// An empty field list makes react-hook-form's trigger() resolve true, letting a step be skipped.
describe('wizard step gating', () => {
  it.each([
    ['specialist step 2', specialistApplicationStep2Schema, 'addresses'],
    ['specialist step 5', specialistApplicationStep5Schema, 'supportFocuses'],
    ['organization step 4', organizationApplicationStep4Schema, 'freeReceptionOther'],
    ['organization step 5', organizationApplicationStep5Schema, 'ethicalControl'],
    ['event step', eventApplicationStepSchema, 'eventDate'],
  ])('reads the fields of %s through its refinements', (unused, schema, expectedField) => {
    const fields = getStepFields({ schema });
    expect(fields.length).toBeGreaterThan(0);
    expect(fields).toContain(expectedField);
  });
});
