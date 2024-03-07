'use client';

import CalendarIcon from '@icons/calendarFilled.svg';
import PriceIcon from '@icons/priceFilled.svg';
import LocationIcon from '@icons/locationFilled.svg';
import TimeIcon from '@icons/timeFilled.svg';
import PropTypes from 'prop-types';
import { Label } from '../Label';
import { cn } from '@/utils/cn';
import { OverflownText } from '../OverflownText';
import { MONTHS } from '@/lib/consts';

const weekDays = {
  0: 'неділя',
  1: 'понеділок',
  2: 'вівторок',
  3: 'середа',
  4: 'четвер',
  5: "п'ятниця",
  6: 'субота',
};

function ListItem({ icon, text, textColor, fontWeight }) {
  return (
    <li className="flex gap-2">
      {icon}
      <p className={cn('w-56 text-p3', textColor, fontWeight)}>{text}</p>
    </li>
  );
}

function transformData(event) {
  const { title, organizerName, tags, priceType, eventDate, format, address, price, locationLink } = event;
  const date = new Date(eventDate);
  const dateText = `${date.getDate()} ${MONTHS[date.getMonth()]}, ${weekDays[date.getDay()]}`;
  const minutes = date.getMinutes().toString();
  const hours = date.getHours().toString();
  const timeText = `${(hours.length === 1 ? '0' : '') + hours}:${(minutes.length === 1 ? '0' : '') + minutes}`;
  const locationText = format === 'ONLINE' ? 'Онлайн' : address;
  let priceText;
  switch (priceType) {
  case 'FREE':
    priceText = 'Безкоштовно';
    break;
  case 'MIN_PRICE':
    priceText = `від ${price}`;
    break;
  case 'FIXED_PRICE':
    priceText = `${price}`;
    break;
  default:
    break;
  }
  return { title, organizerName, tags, priceText, locationText, dateText, timeText, locationLink };
}

export default function EventCard({ event }) {
  const { title, organizerName, tags, priceText, locationText, dateText, timeText, locationLink } =
    transformData(event);

  const addressUnderline = locationLink && 'hover:underline';

  const addressElement = (
    <OverflownText
      className={cn('w-56 truncate text-p3 font-medium text-gray-700', addressUnderline)}
      text={locationText}
    />
  );

  const tagsElements = tags.map(tag => (
    <Label key={tag.name} bgColor="bg-primary-100" textColor="text-primary-600" text={tag.name} />
  ));
  return (
    <div className="flex w-max flex-col gap-4 rounded-3xl border-2 border-gray-200 bg-other-white p-4">
      <div className="flex w-[259px] flex-col items-start gap-1">
        <OverflownText className="w-[259px] truncate text-p1 font-bold text-gray-700 underline" text={title} />
        <OverflownText className="w-[259px] truncate text-p3 font-bold text-primary-600" text={organizerName} />
      </div>
      <div className="flex w-64 items-start gap-4 overflow-hidden">{tagsElements}</div>
      <hr className="border border-dashed border-gray-300" />
      <ul className="flex w-[259px] flex-col gap-4">
        <ListItem icon={<CalendarIcon />} textColor="text-secondary-400" fontWeight="font-bold" text={dateText} />
        <ListItem icon={<TimeIcon />} textColor="text-gray-700" fontWeight="font-medium" text={timeText} />
        <ListItem icon={<PriceIcon />} textColor="text-gray-700" fontWeight="font-medium" text={priceText} />
        <li className="flex gap-2">
          <LocationIcon />
          {locationLink ? (
            <a href={locationLink} target="_blank" rel="noopener noreferrer">
              {addressElement}
            </a>
          ) : (
            addressElement
          )}
        </li>
      </ul>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
};

ListItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  textColor: PropTypes.string,
  fontWeight: PropTypes.string,
};
