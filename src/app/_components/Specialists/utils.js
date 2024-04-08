import _ from 'lodash';

export const getProperEnding = count => {
  const lastDigit = count % 10;
  if (_.range(11, 15).includes(count)) {
    return 'результатів';
  }
  if (_.range(2, 5).includes(lastDigit)) {
    return 'результати';
  }
  if (lastDigit === 1) {
    return 'результат';
  }
  return 'результатів';
};
