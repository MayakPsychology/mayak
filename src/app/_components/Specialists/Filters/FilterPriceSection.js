import ReactSlider from 'react-slider';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import { cn } from '@/utils/cn';
import { MAX_PRICE, MIN_PRICE, isValidRangePrice, priceTypeEnum, specialistFiltersConfig } from './utils';

function Input({ ...attrs }) {
  return (
    <input
      type="text"
      {...attrs}
      className="min-w-0 flex-1 rounded-3xl border border-gray-600 px-3 py-1.5 text-p4 text-gray-600 md:py-1"
    />
  );
}

export default function FilterPriceSection({ className, filters, setFilter, toggleFilter }) {
  const [priceMin, setPriceMin] = useState(+filters.get(specialistFiltersConfig.price.filterKey.priceMin) || MIN_PRICE);
  const [priceMax, setPriceMax] = useState(+filters.get(specialistFiltersConfig.price.filterKey.priceMax) || MAX_PRICE);
  const isFree = filters.getAll(specialistFiltersConfig.price.filterKey.price).includes(priceTypeEnum.FREE);

  useEffect(() => {
    // if valid price range set filter, otherwise reset filter
    setFilter(specialistFiltersConfig.price.filterKey.priceMin, isValidRangePrice(priceMin) ? priceMin : null);
    setFilter(specialistFiltersConfig.price.filterKey.priceMax, isValidRangePrice(priceMax) ? priceMax : null);
  }, [priceMin, priceMax, setFilter]);

  const handleSliderChange = ev => {
    setPriceMin(ev[0]);
    setPriceMax(ev[1]);
  };
  const handleInputChange = ev => {
    const { name, value } = ev.target;
    if (isValidRangePrice(value) || !value) {
      if (name === specialistFiltersConfig.price.filterKey.priceMin) {
        setPriceMin(value);
      }
      if (name === specialistFiltersConfig.price.filterKey.priceMax) {
        setPriceMax(value);
      }
    }
  };
  return (
    <FilterSection title={specialistFiltersConfig.price.title} className={className}>
      <div className="md:flex md:items-start md:gap-4">
        <div className="max-w-80 md:max-w-[216px]">
          <div className="flex items-center gap-6 md:gap-[34px]">
            <Input
              placeholder="Від"
              value={priceMin}
              name={specialistFiltersConfig.price.filterKey.priceMin}
              onChange={handleInputChange}
            />
            <div className="h-0.5 w-5 bg-gray-300 md:w-2" />
            <Input
              placeholder="До"
              value={priceMax}
              name={specialistFiltersConfig.price.filterKey.priceMax}
              onChange={handleInputChange}
            />
          </div>
          <ReactSlider
            className="h-12"
            value={[priceMin, priceMax]}
            max={MAX_PRICE}
            min={MIN_PRICE}
            ariaLabel={[String(MIN_PRICE), String(MAX_PRICE)]}
            pearling
            ariaValuetext={state => `Selected ${state.valueNow}`}
            onChange={handleSliderChange}
            renderThumb={(props, state) => (
              <div
                {...props}
                key={state.index}
                className="top-1/2 z-[2] flex -translate-y-1/2 cursor-move items-center justify-center before:h-5 before:w-5 before:rounded-full before:bg-blue-500 before:shadow-custom-4"
              />
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                key={state.index}
                className={cn('top-1/2 h-1 -translate-y-1/2 cursor-pointer rounded-[4px]', {
                  'bg-blue-300': state.index === 0 || state.index === 2,
                  'z-[1] bg-blue-500': state.index === 1,
                  'z-0': state.index === 2,
                })}
              />
            )}
          />
        </div>
        <CheckBox
          name="price"
          value={priceTypeEnum.FREE}
          checked={isFree}
          onChange={() => toggleFilter(specialistFiltersConfig.price.filterKey.price, priceTypeEnum.FREE)}
          text="Надають безкоштовні прийоми"
          classNames={{ labelText: 'text-p3' }}
        />
      </div>
    </FilterSection>
  );
}

FilterPriceSection.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
};
