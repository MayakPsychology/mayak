import { describe, expect, it } from 'vitest';
import { fitWithin } from '@components/applications/_shared/fields/compressImage';

describe('fitWithin', () => {
  it('leaves an image that already fits alone', () => {
    expect(fitWithin(1200, 900, 2000)).toEqual({ width: 1200, height: 900 });
  });

  it('scales the longest edge down and keeps the aspect ratio', () => {
    expect(fitWithin(4032, 3024, 2000)).toEqual({ width: 2000, height: 1500 });
    expect(fitWithin(3024, 4032, 2000)).toEqual({ width: 1500, height: 2000 });
  });
});
