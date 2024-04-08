'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { CheckMark, Search } from '@icons';
import { PillButton } from '@components/PillButton';
import { Slide, Slider } from '@components/Slider';
import { cn } from '@utils/cn';
import { useBodyScrollLock } from '@/app/_hooks';

const activeButtonStyles = 'pointer-events-none border-secondary-300 bg-secondary-300 font-semibold text-gray-900';

export function DistrictList({ list, className }) {
  const [selected, setSelected] = useState(0);
  const handleClick = index => {
    setSelected(index);
  };

  useBodyScrollLock(true, 'x');

  return (
    <Slider slidesPerView="auto" className={cn('flex', className)}>
      {list.map(({ id, name }, index) => {
        const isSelected = index === selected;

        return (
          <Slide key={id} onClick={() => handleClick(index)} className="mr-3.5 !w-auto last:mr-0">
            <Link
              href={`/specialist?district=${id}`}
              className={cn(isSelected && 'pointer-events-none cursor-none')}
              tabIndex={-1}
            >
              <PillButton
                variant="eventFilter"
                colorVariant="semiorange"
                icon={isSelected ? <CheckMark /> : <Search />}
                forceShowIcon={isSelected}
                className={cn('*:gap-0', isSelected && activeButtonStyles)}
                aria-label={`Click to see specialists related to the district ${name}`}
              >
                {name}
              </PillButton>
            </Link>
          </Slide>
        );
      })}
    </Slider>
  );
}
DistrictList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
};
