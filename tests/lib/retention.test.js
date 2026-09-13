import { describe, expect, it } from 'vitest';
import { ABANDONED_TTL_MS, RETENTION_MS, expiredPathnames, submittedPathname } from '@/lib/uploads';

const NOW = new Date('2026-09-12T03:00:00.000Z').getTime();
const agoMs = ms => new Date(NOW - ms);
const DIPLOMA = 'educationFiles/diploma.pdf';

describe('submittedPathname', () => {
  it('moves a submitted document out of the upload prefix', () => {
    expect(submittedPathname(`applications/${DIPLOMA}`)).toBe(`submitted/${DIPLOMA}`);
  });

  it('leaves anything already outside the upload prefix alone', () => {
    expect(submittedPathname(`submitted/${DIPLOMA}`)).toBe(`submitted/${DIPLOMA}`);
  });
});

describe('expiredPathnames', () => {
  it('drops an upload the form never submitted after a day', () => {
    const blobs = [
      { pathname: 'applications/a.pdf', uploadedAt: agoMs(ABANDONED_TTL_MS + 1000) },
      { pathname: 'applications/b.pdf', uploadedAt: agoMs(ABANDONED_TTL_MS - 1000) },
    ];
    expect(expiredPathnames(blobs, NOW)).toEqual(['applications/a.pdf']);
  });

  it('keeps a submitted document for the full retention window', () => {
    const blobs = [
      { pathname: 'submitted/old.pdf', uploadedAt: agoMs(RETENTION_MS + 1000) },
      { pathname: 'submitted/recent.pdf', uploadedAt: agoMs(RETENTION_MS - 1000) },
    ];
    expect(expiredPathnames(blobs, NOW)).toEqual(['submitted/old.pdf']);
  });

  it('leaves blobs outside its own prefixes alone, however old', () => {
    const blobs = [
      { pathname: 'avatars/someone.png', uploadedAt: agoMs(RETENTION_MS * 4) },
      { pathname: 'exports/report.csv', uploadedAt: agoMs(RETENTION_MS * 4) },
    ];
    expect(expiredPathnames(blobs, NOW)).toEqual([]);
  });

  it('never applies the one-day rule to a submitted document', () => {
    const blobs = [{ pathname: 'submitted/yesterday.pdf', uploadedAt: agoMs(ABANDONED_TTL_MS + 1000) }];
    expect(expiredPathnames(blobs, NOW)).toEqual([]);
  });
});
