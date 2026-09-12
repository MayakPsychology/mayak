import { describe, expect, it } from 'vitest';
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_SIZE, uploadTokenOptions } from '@/lib/uploads';

describe('uploadTokenOptions', () => {
  it('caps a single file at the 10MB the mocks ask for', () => {
    expect(uploadTokenOptions().maximumSizeInBytes).toBe(MAX_UPLOAD_SIZE);
    expect(MAX_UPLOAD_SIZE).toBe(10 * 1024 * 1024);
  });

  it('admits only document and image types', () => {
    expect(ALLOWED_UPLOAD_TYPES).toContain('application/pdf');
    expect(ALLOWED_UPLOAD_TYPES).toContain('image/jpeg');
    expect(ALLOWED_UPLOAD_TYPES.some(type => /javascript|octet-stream|x-msdownload/.test(type))).toBe(false);
  });

  it('issues a token that expires within the minute', () => {
    const ttl = uploadTokenOptions().validUntil - Date.now();
    expect(ttl).toBeGreaterThan(0);
    expect(ttl).toBeLessThanOrEqual(60 * 1000);
  });

  it('never lets a client overwrite an existing blob by guessing a pathname', () => {
    expect(uploadTokenOptions().addRandomSuffix).toBe(true);
    expect(uploadTokenOptions().allowOverwrite).toBeUndefined();
  });
});
