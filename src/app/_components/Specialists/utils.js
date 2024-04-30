import _ from 'lodash';
import { addressesToPoints } from '@utils/common';
import { specialistTypeEnum } from './Filters/utils';

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

const concatenateArrays = (accumulator, current) => accumulator.concat(current);

export const mapAddressesToPoints = ({ addressesList, specialistId }) =>
  addressesToPoints(addressesList)
    .map((address, index) => ({
      ...address,
      meta: {
        specialistId,
        index: `${specialistId}-${index}`,
      },
    }))
    ?.reduce(concatenateArrays, []);

export const mapSpecialistsListIntoPointsList = list =>
  list
    ?.map(entry => {
      const { addresses, id } = entry.organization || entry.specialist;

      if (!addresses) {
        return [];
      }

      return addressesToPoints(addresses).map((address, index) => ({
        ...address,
        meta: {
          specialistId: id,
          index: `${id}-${index}`,
        },
      }));
    })
    ?.reduce(concatenateArrays, []);

export const sliderBreakpoints = {
  360: {
    slidesPerView: 1,
    spaceBetween: 24,
  },
  640: {
    slidesPerView: 1.25,
    spaceBetween: 16,
  },
  768: {
    slidesPerView: 1.5,
    spaceBetween: 14,
  },
};

export const getProperEnding = count => getProperEndingWithBase('результат', count);

export const getSpecialistURL = ({ type, id }) => `/${type === specialistTypeEnum.ORGANIZATION ? 'organization' : 'specialist'}/${id}`