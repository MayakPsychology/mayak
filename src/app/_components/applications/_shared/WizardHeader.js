'use client';

import PropTypes from 'prop-types';
import { CloseIcon } from '@icons';
import { cn } from '@utils/cn';
import { useRequestClose } from './ApplicationClose';

export function WizardHeader({ index = 0, total = 1, onBack, isFilled = false }) {
  const requestClose = useRequestClose();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            aria-label="Повернутись до попереднього кроку"
            onClick={onBack}
            className="p-2 text-primary-700 hover:text-primary-400"
          >
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
              <path
                d="M9 1 1 9l8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          aria-label="Закрити форму"
          onClick={requestClose}
          className="p-2 text-gray-700 hover:text-primary-400"
        >
          <CloseIcon aria-hidden="true" />
        </button>
      </div>

      {total > 1 && (
        <div
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Крок ${index + 1} з ${total}`}
          className="relative flex h-3 w-full items-center rounded-full bg-other-white"
        >
          {/* the fill stops half a bar past the current step's dot, the way the mock draws it */}
          <div
            className="absolute left-0 h-3 rounded-full bg-primary-500"
            style={{ width: isFilled ? '100%' : `calc(${((index + 0.5) / total) * 100}% + 6px)` }}
          />
          {Array.from({ length: total }, (unused, step) => (
            <span key={step} className="z-10 flex flex-1 justify-center">
              <span
                className={cn('h-1.5 w-1.5 rounded-full', isFilled || step <= index ? 'bg-other-white' : 'bg-primary-400')}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

WizardHeader.propTypes = {
  index: PropTypes.number,
  total: PropTypes.number,
  onBack: PropTypes.func,
  isFilled: PropTypes.bool,
};
