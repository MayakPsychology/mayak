'use client';

import PropTypes from 'prop-types';
import { Compassion } from '@icons';
import { Paragraph } from '@components/Typography';
import { cn } from '@/utils/cn';

export function DonationSection({ onDonateClick, className }) {
  return (
    <div className={cn('w-full shrink-0 bg-secondary-100', className)}>
      <div className="flex items-center">
        <Compassion />
      </div>
      <div className="flex gap-2 lg:gap-12">
        <div className="flex w-full items-center justify-end gap-2 px-2 py-1">
          <Paragraph className="whitespace-nowrap text-p3 font-bold">
            <span className="hidden text-gray-700 lg:inline">
              Підтримайте нас для реалізації волонтерський проектів з наданням допомоги...
            </span>
            <span className="inline lg:hidden">Підтримати нас</span>
          </Paragraph>
        </div>
        <div onClick={onDonateClick} className="flex items-center">
          <Paragraph className="cursor-pointer select-none text-p3 text-secondary-500 underline">Задонатити</Paragraph>
        </div>
      </div>
    </div>
  );
}

DonationSection.propTypes = {
  onDonateClick: PropTypes.func,
  className: PropTypes.string,
};
