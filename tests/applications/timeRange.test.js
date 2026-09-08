import { describe, expect, it } from 'vitest';
import { formatTime, isOrderedRange, parseRange } from '@components/applications/_shared/fields/timeRange';
import { zWorkDaySchema } from '@/lib/validationSchemas/applications/common';

const render = range => `${formatTime(range.start)} - ${formatTime(range.end)}`;

describe('work time range picker', () => {
  it('round-trips a stored range', () => {
    expect(render(parseRange('09:00 - 18:30'))).toBe('09:00 - 18:30');
  });

  it('pads single-digit values into the format the schema accepts', () => {
    const time = render({ start: { h: 9, m: 5 }, end: { h: 0, m: 0 } });
    expect(time).toBe('09:05 - 00:00');
    expect(zWorkDaySchema.safeParse({ weekDay: 'Понеділок', time, isDayOff: false }).success).toBe(true);
  });

  it('treats a missing range as empty', () => {
    expect(parseRange(null)).toEqual({ start: { h: null, m: null }, end: { h: null, m: null } });
    expect(parseRange('10:00')).toEqual({ start: { h: 10, m: 0 }, end: { h: null, m: null } });
  });

  it('rejects a range that runs from the later hour to the earlier one', () => {
    expect(isOrderedRange('18:00 - 10:00')).toBe(false);
    expect(isOrderedRange('10:00 - 10:00')).toBe(false);
    expect(isOrderedRange('10:00 - 18:00')).toBe(true);
    // the dial writes midnight as 00:00, which still ends the day later than it started
    expect(isOrderedRange('22:00 - 00:00')).toBe(true);
  });

  it('refuses a reversed range in the schema', () => {
    const result = zWorkDaySchema.safeParse({ weekDay: 'Понеділок', time: '18:00 - 10:00', isDayOff: false });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe('Час завершення має бути пізніше за час початку');
  });
});
