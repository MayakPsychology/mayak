import { describe, expect, it } from 'vitest';
import { number } from '@/lib/validationSchemas/utils';

const optionalPrice = number('Ціна').min(0).nullish().optional().zod;
const requiredYears = number('Стаж').min(0.5).halfStep().zod;

describe('optional number fields', () => {
  it.each([
    ['an empty string', ''],
    ['null', null],
    ['undefined', undefined],
  ])('treats %s as absent rather than zero', (_label, input) => {
    const result = optionalPrice.safeParse(input);
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
  });

  it('coerces a numeric string', () => {
    expect(optionalPrice.parse('500')).toBe(500);
  });

  it('keeps an explicit zero', () => {
    expect(optionalPrice.parse('0')).toBe(0);
  });

  it.each([
    ['a negative value', '-5'],
    ['a non-numeric value', 'abc'],
  ])('rejects %s', (_label, input) => {
    expect(optionalPrice.safeParse(input).success).toBe(false);
  });
});

describe('required number fields', () => {
  it('rejects an empty string', () => {
    expect(requiredYears.safeParse('').success).toBe(false);
  });

  it('accepts half steps', () => {
    expect(requiredYears.parse('2.5')).toBe(2.5);
  });

  it('rejects values below the minimum', () => {
    expect(requiredYears.safeParse('0').success).toBe(false);
  });

  it('rejects values off the half step', () => {
    expect(requiredYears.safeParse('2.3').success).toBe(false);
  });
});
