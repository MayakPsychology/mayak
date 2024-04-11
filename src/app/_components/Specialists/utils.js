import _ from 'lodash';

export const getProperEndingWithBase = (base, count) => {
  const lastDigit = count % 10;
  if (_.range(11, 15).includes(count)) {
    return `${base}ів`;
  }
  if (_.range(2, 5).includes(lastDigit)) {
    return `${base}и`;
  }
  if (lastDigit === 1) {
    return base;
  }
  return `${base}ів`;
};

export const getProperEnding = count => getProperEndingWithBase('результат', count);
