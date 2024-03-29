'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { CheckMark, Search } from '@icons';
import { PillButton } from '@components/PillButton';
import { Slide, Slider } from '@components/Slider';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';

const activeButtonStyles = 'pointer-events-none border-secondary-300 bg-secondary-300 font-semibold text-gray-900';
const commonIconStyle = 'h-4 w-4 transition-all';

export function DistrictList({ list, className }) {
  const [selected, setSelected] = useState(0);
  const handleClick = index => {
    setSelected(index);
  };

  const motionOnHover = {
    rest: { x: 0, ease: 'easeOut', duration: 0.4, type: 'spring' },
    hover: {
      x: -7.5,
      transition: {
        duration: 0.4,
        type: 'spring',
        ease: 'easeIn',
      },
    },
  };

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
              <motion.div variants={motionOnHover} animate="rest" whileHover="hover" whileFocus="hover">
                <PillButton
                  variant="eventFilter"
                  colorVariant="semiorange"
                  icon={[
                    isSelected && (
                      <CheckMark
                        key={`checkmark+${index}`}
                        className={cn('block group-hover:hidden group-focus:hidden', commonIconStyle)}
                      />
                    ),
                    <Search
                      key={`searchicon+${index}`}
                      className={cn('hidden group-hover:block group-focus:block', commonIconStyle)}
                    />,
                  ]}
                  className={cn(isSelected && activeButtonStyles, 'group', { 'w-[170px]': index !== 0 })}
                  aria-label={`Click to see specialists related to the district with id ${id}`}
                >
                  {name}
                </PillButton>
              </motion.div>
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
