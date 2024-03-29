import PropTypes from 'prop-types';
import { Price } from '@icons/index';
import { supportFocusesPropType } from '@components/CardSpecialist/prop-types';
import { cn } from '@/utils/cn';

export function TherapyPrices({ supportFocuses, className }) {
  const therapyPrices = supportFocuses?.filter(el => el.price !== null);

  return (
    <div className={cn('flex flex-row gap-3 md:gap-4', className)}>
      <span className="text-gray-500 lg:mt-[3px]">
        <Price />
      </span>
      <div className="flex w-full flex-col">
        <h3 className="font-bold text-gray-700">
          <span className="lg:hidden">Прайс</span>
          <span className="hidden lg:inline">Прайс на тип терапії</span>
        </h3>
        {therapyPrices?.length ? (
          <ul className="flex flex-wrap text-p4 lg:text-p3">
            {therapyPrices.map(therapyPrice => (
              <li key={therapyPrice.id} className="text-system-info md:whitespace-nowrap md:font-bold">
                {therapyPrice.therapy.title} від {therapyPrice.price} грн / год.
                <div className="inline-block w-[20px]" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-p4 lg:text-p3">Не зазначено</p>
        )}
      </div>
    </div>
  );
}

TherapyPrices.propTypes = {
  supportFocuses: PropTypes.arrayOf(supportFocusesPropType),
  className: PropTypes.string,
};
