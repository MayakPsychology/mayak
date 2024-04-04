import { PillButton } from '@components/PillButton';
import { List, Map } from '@icons';
import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import Link from 'next/link';

export function MapLink({ mapMode = false, className }) {
  const buttonText = mapMode ? 'Показати список' : 'Шукати на карті';
  const href = mapMode ? '/specialist' : '/specialist?mode=map';
  const icon = mapMode ? <List /> : <Map />;

  return (
    <Link href={href} aria-label="">
      <PillButton
        icon={icon}
        variant="filled"
        colorVariant="orange"
        className={cn('z-10 flex items-center', className)}
      >
        <span className="hidden md:block">{buttonText}</span>
      </PillButton>
    </Link>
  );
}

MapLink.propTypes = {
  className: PropTypes.string,
  mapMode: PropTypes.bool,
};
