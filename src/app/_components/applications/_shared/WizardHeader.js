'use client';

import PropTypes from 'prop-types';
import { CloseIcon } from '@icons';
import { useRequestClose } from './ApplicationClose';

export function WizardHeader({ index = 0, total = 1, onBack }) {
  const requestClose = useRequestClose();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            type="button"
            aria-label="Повернутись до попереднього кроку"
            onClick={onBack}
            disabled={index === 0}
            className="p-2 text-primary-700 hover:text-primary-400 disabled:pointer-events-none disabled:opacity-40"
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
          className="relative flex h-3 w-full items-center rounded-full bg-primary-200"
        >
          <div
            className="absolute left-0 flex h-3 items-center justify-end rounded-full bg-primary-500 pr-1.5"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-other-white" />
          </div>
          {Array.from({ length: total }, (unused, step) => (
            <span key={step} className="flex flex-1 justify-center">
              {step > index && <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />}
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
};
