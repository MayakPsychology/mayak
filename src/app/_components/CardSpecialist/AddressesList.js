import React from 'react';
import PropTypes from 'prop-types';
import { HospitalSVG } from '@icons/index';
import { cn } from '@utils/cn';

export function AddressesList({ addresses, className, showIcon = false }) {
  return (
    <ul className={cn('flex flex-col gap-4 border-dashed border-t-gray-200', className)}>
      {addresses?.map(({ id, nameOfClinic, fullAddress, city, district }) => (
        <li key={id} className="flex gap-4">
          {showIcon && (
            <span className="text-gray-500">
              <HospitalSVG />
            </span>
          )}
          <div className="text-p4 lg:text-p3">
            <h3 className="font-bold text-gray-700">{nameOfClinic || 'Місце надання послуг'}</h3>
            <div>
              <p>{fullAddress}</p>
              <p>{[district && `${district.name} район`, city?.name].filter(Boolean).join(', ')}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

AddressesList.propTypes = {
  addresses: PropTypes.array,
  showIcon: PropTypes.bool,
  className: PropTypes.node,
};
