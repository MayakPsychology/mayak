'use client';

import PropTypes from 'prop-types';
import { PillButton } from '@/app/_components/PillButton';

export function WizardNavigation({ isLast, isPending, onClear, onNext }) {
  return (
    <div className="mt-10 flex justify-between gap-4">
      <PillButton
        variant="outlined"
        colorVariant="blue"
        aria-label="Очистити форму"
        onClick={onClear}
        disabled={isPending}
      >
        Очистити
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
  );
}

WizardNavigation.propTypes = {
  isLast: PropTypes.bool,
  isPending: PropTypes.bool,
  onClear: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};
