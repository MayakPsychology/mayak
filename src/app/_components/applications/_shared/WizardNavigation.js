'use client';

import PropTypes from 'prop-types';
import { PillButton } from '@/app/_components/PillButton';

export function WizardNavigation({ index, total, isFirst, isLast, isPending, onBack, onNext }) {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <p className="text-center text-p4 text-gray-700">
        Крок {index + 1} з {total}
      </p>
      <div className="flex justify-between gap-4">
        <PillButton
          variant="outlined"
          colorVariant="blue"
          aria-label="Повернутись до попереднього кроку"
          onClick={onBack}
          disabled={isFirst || isPending}
        >
          Назад
        </PillButton>
        {isLast ? (
          <PillButton
            type="submit"
            variant="filled"
            colorVariant="blue"
            aria-label="Надіслати заявку"
            disabled={isPending}
          >
            {isPending ? 'Надсилаємо…' : 'Надіслати заявку'}
          </PillButton>
        ) : (
          <PillButton
            variant="filled"
            colorVariant="blue"
            aria-label="Перейти до наступного кроку"
            onClick={onNext}
            disabled={isPending}
          >
            Далі
          </PillButton>
        )}
      </div>
    </div>
  );
}

WizardNavigation.propTypes = {
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  isPending: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};
