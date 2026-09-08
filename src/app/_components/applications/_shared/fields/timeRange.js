// Pure helpers for the work-time picker, kept out of the JSX file so tests can import them.

export const DIAL_SIZE = 256;
export const CENTER = DIAL_SIZE / 2;
export const OUTER_RADIUS = 104;
export const INNER_RADIUS = 68;
export const EMPTY = { h: null, m: null };
export const EMPTY_RANGE = { start: EMPTY, end: EMPTY };

const pad = number => String(number).padStart(2, '0');

export const parseTime = part => {
  const match = /^(\d{1,2}):(\d{2})$/.exec((part ?? '').trim());
  if (!match) return EMPTY;
  return { h: Number(match[1]), m: Number(match[2]) };
};

// the schema stores the schedule as a single "HH:MM - HH:MM" string
export const parseRange = value => {
  const [start, end] = (value ?? '').split(' - ');
  return { start: parseTime(start), end: parseTime(end) };
};

export const formatTime = ({ h, m }) => (h === null || m === null ? '' : `${pad(h)}:${pad(m)}`);

// 30° per step, 0 = 12 o'clock, clockwise
const pointAt = (step, radius) => ({
  x: CENTER + radius * Math.sin((step * Math.PI) / 6),
  y: CENTER - radius * Math.cos((step * Math.PI) / 6),
});

export const HOURS = [
  // outer ring: 12, 1 … 11
  ...Array.from({ length: 12 }, (unused, step) => {
    const value = step === 0 ? 12 : step;
    return { value, label: String(value), ...pointAt(step, OUTER_RADIUS) };
  }),
  // inner ring: 24 (midnight), 13 … 23
  ...Array.from({ length: 12 }, (unused, step) => ({
    value: step === 0 ? 0 : 12 + step,
    label: step === 0 ? '24' : String(12 + step),
    ...pointAt(step, INNER_RADIUS),
  })),
];

// ponytail: 5-minute steps only — a schedule never needs finer, and it keeps the dial to 12 targets
export const MINUTES = Array.from({ length: 12 }, (unused, step) => ({
  value: step * 5,
  label: pad(step * 5),
  ...pointAt(step, OUTER_RADIUS),
}));

export { pad };

const MINUTES_IN_DAY = 24 * 60;

export const toMinutes = ({ h, m }) => (h === null || m === null ? null : h * 60 + m);

/**
 * A working day has to read from the earlier hour to the later one. A 00:00 end is
 * the one exception — the dial writes midnight that way and it means "until midnight".
 */
export const isOrderedRange = value => {
  const { start, end } = parseRange(value);
  const from = toMinutes(start);
  const to = toMinutes(end);
  if (from === null || to === null) return false;
  return (to === 0 ? MINUTES_IN_DAY : to) > from;
};
