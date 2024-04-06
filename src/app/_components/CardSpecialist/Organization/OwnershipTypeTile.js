import { OwnershipType } from '@prisma/client';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

export function OwnershipTypeTile({ ownershipType, className }) {
  const translations = {
    [OwnershipType.GOVERNMENT]: 'Державна',
    [OwnershipType.PRIVATE]: 'Приватна',
  };

  return (
    <div
      className={cn(
        'w-fit rounded-[4px] bg-gray-100 p-1 text-[0.875rem] font-medium leading-[1.125rem] text-gray-700 lg:px-3',
        className,
      )}
    >
      {translations[ownershipType]}
    </div>
  );
}

OwnershipTypeTile.propTypes = {
  ownershipType: PropTypes.oneOf(Object.values(OwnershipType)),
  className: PropTypes.string,
};
