'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { CalendarIcon, LocationIcon, PriceIcon, TimeIcon } from '@icons';
import { Label } from '@components/Label';
import { OverflownText } from '@components/OverflownText';
import { EventLinkModal } from '@components/EventLinkModal';
import { cn } from '@/utils/cn';
import { parseDate } from '@/utils/parseDate';

function ListItem({ icon, text, textColor, fontWeight }) {
  return (
    <li className="flex gap-2">
      {icon}
      <p className={cn('w-56 text-p3', textColor, fontWeight)}>{text}</p>
    </li>
  );
}

function transformData(event) {
  const { title, organizerName, tags, priceType, eventDate, format, address, price, locationLink, additionalLink } =
    event;

  const { day, month, time } = parseDate(eventDate);
  const date = `${month}, ${day} `;
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
  return { title, organizerName, tags, priceText, locationText, date, time, locationLink, additionalLink };
}

export function EventCard({ event }) {
  const [isModalOpenOpen, setIsModalOpen] = useState(false);

  const { title, organizerName, tags, priceText, locationText, date, time, locationLink, additionalLink } =
    transformData(event);
  const checkPrice = priceText === 'Безкоштовно' ? priceText : `${priceText} грн`;

  const addressElement = (
    <OverflownText
      className={cn('w-56 truncate text-p3 font-medium text-gray-700', { 'hover:underline': locationLink })}
      text={locationText}
    />
  );

  function toggleModal() {
    setIsModalOpen(prevState => !prevState);
  }

  const tagsElements = tags?.map(tag => (
    <Label
      key={tag.name}
      className="pointer-events-none bg-primary-100"
      textClassName="text-primary-600"
      text={tag.name}
    />
  ));
  return (
    <div className="flex h-[310px] w-full flex-grow flex-col gap-4 self-stretch rounded-3xl border-2 border-gray-200 bg-other-white p-4">
      <div className="flex w-[259px] cursor-pointer flex-col items-start gap-1" onClick={toggleModal}>
        <OverflownText className="w-[259px] truncate text-p1 font-bold text-gray-700 underline" text={title} />
        <OverflownText className="w-[259px] truncate text-p3 font-bold text-primary-600" text={organizerName} />
      </div>
      {tagsElements.length === 0 && <div className="flex h-[25px] w-64 items-start gap-4" />}
      <ul className="flex items-start gap-4">{tagsElements}</ul>
      <hr className="border border-dashed border-gray-300" />
      <ul className="flex w-[259px] flex-col gap-4">
        <ListItem icon={<CalendarIcon />} textColor="text-secondary-400" fontWeight="font-bold" text={date} />
        <ListItem icon={<TimeIcon />} textColor="text-gray-700" fontWeight="font-medium" text={time} />
        <ListItem icon={<PriceIcon />} textColor="text-gray-700" fontWeight="font-medium" text={checkPrice} />
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

      <EventLinkModal isOpen={isModalOpenOpen} onClose={() => setIsModalOpen(false)} link={additionalLink?.link} />
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
