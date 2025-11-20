import React from 'react';
import { WEEKDAYS_TRANSLATION } from '@/app/(admin)/admin/_lib/consts';
import { TextInputField } from '@/app/_components/InputFields';

export function WorkTimeGroup() {
  return (
    <fieldset>
      <legend className="text-lg mb-4 font-semibold">Графік роботи</legend>
      <div>
        {Object.values(WEEKDAYS_TRANSLATION).map(weekDay => (
          <div key={weekDay} className="mb-4 grid grid-cols-1 gap-16 sm:grid-cols-3">
            <div>{weekDay}</div>
            <TextInputField
              width="full"
              type="text"
              text="Час роботи"
              name={`workTime.${weekDay}.time`}
              placeholder="Час роботи"
            />
            <select
              name={`workTime.${weekDay}.isDayOff`}
              className="w-full rounded border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Оберіть статус</option>
              <option value="true">Вихідний</option>
              <option value="false">Робочий</option>
            </select>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
