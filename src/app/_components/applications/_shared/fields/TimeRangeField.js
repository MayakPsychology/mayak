'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdKeyboard, MdOutlineAccessTime } from 'react-icons/md';
import { cn } from '@utils/cn';
import { ClientPortal } from '@/app/_components/ClientPortal';
import {
  CENTER,
  DIAL_SIZE,
  EMPTY_RANGE,
  HOURS,
  MINUTES,
  formatTime,
  isOrderedRange,
  pad,
  parseRange,
  parseTime,
} from './timeRange';

function Chip({ children, isActive, onClick, ariaLabel }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        'w-[72px] rounded-lg py-2 text-center text-p1 font-bold md:text-h4',
        isActive ? 'bg-primary-400 text-other-white' : 'bg-primary-300 text-primary-800',
      )}
    >
      {children}
    </button>
  );
}

Chip.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

function Dial({ items, selected, onSelect }) {
  const marker = items.find(item => item.value === selected);

  return (
    <div className="relative shrink-0" style={{ width: DIAL_SIZE, height: DIAL_SIZE }}>
      <div className="absolute inset-0 rounded-full bg-primary-300" />
      {marker && (
        <svg className="absolute inset-0" width={DIAL_SIZE} height={DIAL_SIZE} aria-hidden="true">
          <line x1={CENTER} y1={CENTER} x2={marker.x} y2={marker.y} stroke="#002547" strokeWidth="2" />
          <circle cx={CENTER} cy={CENTER} r="4" fill="#002547" />
        </svg>
      )}
      {items.map(item => (
        <button
          key={item.value}
          type="button"
          onClick={() => onSelect(item.value)}
          style={{ left: item.x, top: item.y }}
          className={cn(
            'absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full',
            'text-p3 hover:bg-primary-400/40',
            item.value === selected ? 'bg-primary-800 font-bold text-other-white' : 'text-primary-900',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

Dial.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

// Trigger styling shared by the work-schedule grid and the event time field.
export const TIME_PILL_CLASS =
  'w-full rounded-lg border border-primary-400/40 bg-primary-300 px-3 py-2 text-p4 font-bold text-primary-800 md:text-p3';

// The work schedule needs a start and an end; a single event time reuses the same dial
// with only the first row.
const RANGE_PARTS = [
  ['start', 'Початок'],
  ['end', 'Кінець'],
];
const SINGLE_PART = [['start', 'Час']];

function TimePickerField({ value, onChange, label, className, hasError, parts }) {
  const isRange = parts.length > 1;

  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState(EMPTY_RANGE);
  const [active, setActive] = useState({ part: 'start', unit: 'h' });
  const [isTyping, setIsTyping] = useState(false);

  const open = () => {
    setDraft(isRange ? parseRange(value) : { ...EMPTY_RANGE, start: parseTime(value) });
    setActive({ part: 'start', unit: 'h' });
    setIsTyping(false);
    setIsOpen(true);
  };

  const current = draft[active.part];
  const range = `${formatTime(draft.start)} - ${formatTime(draft.end)}`;
  const picked = isRange ? range : formatTime(draft.start);
  const isComplete = parts.every(([part]) => Boolean(formatTime(draft[part])));
  // only a range can be the wrong way round
  const isOrdered = isComplete && (!isRange || isOrderedRange(range));

  const select = number => {
    setDraft(previous => ({ ...previous, [active.part]: { ...previous[active.part], [active.unit]: number } }));
    // picking the hour moves on to the minutes, the way a clock dialog usually does
    if (active.unit === 'h') setActive({ ...active, unit: 'm' });
  };

  const typeTime = (part, time) => setDraft(previous => ({ ...previous, [part]: parseTime(time) }));

  const confirm = () => {
    onChange(picked);
    setIsOpen(false);
  };

  const renderRow = (part, rowLabel) => (
    <div key={part} className="flex items-center gap-2">
      <span className="w-16 text-p4 text-primary-700">{rowLabel}</span>
      {isTyping ? (
        <input
          type="time"
          aria-label={rowLabel}
          value={formatTime(draft[part])}
          onChange={event => typeTime(part, event.target.value)}
          className="rounded-lg border-0 bg-primary-300 px-3 py-2 text-p2 font-bold text-primary-800"
        />
      ) : (
        <>
          <Chip
            ariaLabel={`${rowLabel}: години`}
            isActive={active.part === part && active.unit === 'h'}
            onClick={() => setActive({ part, unit: 'h' })}
          >
            {draft[part].h === null ? '--' : pad(draft[part].h)}
          </Chip>
          <span className="text-p1 font-bold text-primary-800 md:text-h4">:</span>
          <Chip
            ariaLabel={`${rowLabel}: хвилини`}
            isActive={active.part === part && active.unit === 'm'}
            onClick={() => setActive({ part, unit: 'm' })}
          >
            {draft[part].m === null ? '--' : pad(draft[part].m)}
          </Chip>
        </>
      )}
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={cn(
          'text-left',
          className,
          hasError && 'border-system-error',
          value ? 'text-primary-800' : 'text-primary-800/60',
        )}
      >
        {value || label}
      </button>

      {/* ponytail: plain portal overlay instead of <Modal> — the form already runs inside one. */}
      <ClientPortal selector="modal-root" show={isOpen}>
        <div
          className="fixed inset-0 z-[1400] flex items-center justify-center overflow-y-auto bg-primary-900/40 px-4 py-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Обрати час"
            className="m-auto rounded-2xl bg-primary-200 p-6 shadow-custom-2"
            onClick={event => event.stopPropagation()}
          >
            <p className="mb-6 text-p2 font-bold text-primary-800">Обрати час</p>
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-4">{parts.map(([part, rowLabel]) => renderRow(part, rowLabel))}</div>
              {!isTyping && (
                <Dial items={active.unit === 'h' ? HOURS : MINUTES} selected={current[active.unit]} onSelect={select} />
              )}
            </div>
            {isRange && isComplete && !isOrdered && (
              <p className="mt-4 text-p4 font-semibold text-system-error">
                Час завершення має бути пізніше за час початку
              </p>
            )}
            <div className="mt-6 flex items-center justify-between gap-4">
              <button
                type="button"
                aria-label={isTyping ? 'Обрати час на циферблаті' : 'Ввести час з клавіатури'}
                onClick={() => setIsTyping(!isTyping)}
                className="text-[24px] text-primary-800"
              >
                {isTyping ? <MdOutlineAccessTime /> : <MdKeyboard />}
              </button>
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-p3 font-bold text-primary-700 md:text-p2"
                >
                  Скасувати
                </button>
                <button
                  type="button"
                  disabled={!isOrdered}
                  onClick={confirm}
                  className="text-p3 font-bold text-primary-700 disabled:text-gray-500 md:text-p2"
                >
                  ОК
                </button>
              </div>
            </div>
          </div>
        </div>
      </ClientPortal>
    </>
  );
}

TimePickerField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  hasError: PropTypes.bool,
  parts: PropTypes.array.isRequired,
};

/** "HH:MM - HH:MM" — the work schedule. */
export function TimeRangeField(props) {
  return <TimePickerField {...props} parts={RANGE_PARTS} />;
}

/** "HH:MM" — a single moment, e.g. the start of an event. */
export function TimeField(props) {
  return <TimePickerField {...props} parts={SINGLE_PART} />;
}
