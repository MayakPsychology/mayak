import PropTypes from 'prop-types';
import { CheckMark, Search } from '@icons';
import { useState } from 'react';
import { capitalize } from 'lodash';
import { Slide, Slider } from '@components/Slider';
import { PillButton } from '@components/PillButton';
import { cn } from '@/utils/cn';

const activeButtonStyles =
  'pointer-events-none !border-secondary-300 !bg-secondary-300 focus:bg-secondary-300 font-semibold text-gray-900 focus:text-gray-900 focus:border-secondary-300';

export function MonthFilter({ filteredMonths, handleClick, activeMonth }) {
  const [swipeToIndex, setSwipeToIndex] = useState(0);
  return (
    <div className="flex w-fit max-w-full justify-start">
      <Slider slidesPerView="auto" className="flex" swipeToIndex={swipeToIndex}>
        {filteredMonths.map((month, filteredIndex) => {
          const isSelected = activeMonth - 1 === month.index;
          return (
            <Slide key={month.index} className="mr-3.5 !w-auto">
              <PillButton
                variant="eventFilter"
                colorVariant="semiorange"
                className={cn('*:gap-0', {
                  [activeButtonStyles]: isSelected
                })}
                icon={isSelected ? <CheckMark /> : <Search />}
                forceShowIcon={isSelected}
                onClick={() => {
                  handleClick(month.index + 1);
                  setSwipeToIndex(filteredIndex);
                }}
              >
                {capitalize(month.name)}
              </PillButton>
            </Slide>
          );
        })}
      </Slider>
    </div>
  );
}

MonthFilter.propTypes = {
  filteredMonths: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired,
    }),
  ),
  handleClick: PropTypes.func,
  activeMonth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
