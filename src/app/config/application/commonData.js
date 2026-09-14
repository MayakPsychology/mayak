export const emptyAddress = {
  isPrimary: false,
  fullAddress: null,
  nameOfClinic: null,
  city: null,
  district: null,
};

/**
 * The seed ships an "Інші"/"Інше" row of its own in the method and category lists.
 * The forms replace it with the free-text option, so the seeded one is filtered out —
 * otherwise QA sees the same choice twice.
 */
export const isSeededOtherOption = (option = {}) => /^інш/i.test(option.title ?? option.name ?? '');
