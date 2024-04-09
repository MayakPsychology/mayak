import PropTypes from 'prop-types';
import { Clock } from '@icons';
import { cn } from '@/utils/cn';
import { transformWorkTime } from '@/utils/common';

const translations = {
  MON: 'пн',
  TUE: 'вт',
  WED: 'ср',
  THU: 'чт',
  FRI: 'пт',
  SAT: 'сб',
  SUN: 'нд',
};

export function WorkTime({ workTime, className, shortVersion = false }) {
  const transformedTime = transformWorkTime(workTime, translations);
  return (
    <div className={cn('flex shrink-0 items-start gap-2', className)}>
      <Clock />
      {shortVersion ? (
        <ul className="flex gap-2">
          {transformedTime.map(day => (
            <li
              className={cn('flex items-start gap-2 text-c3 text-gray-700', { 'text-gray-500': day.isDayOff })}
              key={day.weekDay}
            >
              {day.weekDay}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col items-start gap-0.5">
          {transformedTime.map(day => (
            <li
              className={cn('flex items-start gap-2 text-c3 text-gray-700', { 'text-gray-500': day.isDayOff })}
              key={day.weekDay}
            >
              <p>{day.weekDay}</p>
              <p className="w-20 text-right">{day.isDayOff ? 'вихідний' : day.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

WorkTime.propTypes = {
  workTime: PropTypes.arrayOf(
    PropTypes.shape({
      isDayOff: PropTypes.bool,
      time: PropTypes.string,
      weekDay: PropTypes.string,
    }),
  ),
  shortVersion: PropTypes.bool,
  className: PropTypes.string,
};
