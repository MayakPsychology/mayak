import React from 'react';
import PropTypes from 'prop-types';
import { IDCard } from '@icons/index';
import { cn } from '@utils/cn';
import { AddressesList } from '@components/CardSpecialist/AddressesList';
import { TherapyPrices } from '@components/CardSpecialist/TherapyPrices';
import { supportFocusesPropType } from './prop-types';

export function DetailsList({ details, className, text }) {
  const { addresses, description, supportFocuses } = details;
  const hasAddresses = addresses.length > 0;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {hasAddresses && <AddressesList addresses={addresses} showIcon />}
      <TherapyPrices supportFocuses={supportFocuses} className="hidden lg:flex" />
      <ul>
        {description && (
          <li className="flex gap-3 md:gap-4">
            <span className="text-gray-500 lg:mt-[3px]">
              <IDCard />
            </span>
            <div className="text-p4 lg:text-p3">
              <h3 className="font-bold text-gray-700">Про {text}</h3>
              <p>{description}</p>
            </div>
          </li>
        )}
      </ul>
      <TherapyPrices supportFocuses={supportFocuses} className="lg:hidden" />
    </div>
  );
}

DetailsList.propTypes = {
  details: PropTypes.shape({
    addresses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        nameOfClinic: PropTypes.string.isRequired,
        fullAddress: PropTypes.string.isRequired,
        city: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        district: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      }),
    ),
    description: PropTypes.string,
    supportFocuses: PropTypes.arrayOf(supportFocusesPropType),
  }),
  className: PropTypes.node,
  text: PropTypes.string,
};
