'use client';

import { PillButton } from '@components/PillButton';
import { List, Map } from '@icons';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export function MapLink({ mapMode = false, className }) {
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const restParams = params ? `&${params}` : '';
  const buttonText = mapMode ? 'Показати список' : 'Шукати на карті';
  const href = mapMode ? '/specialist' : `/specialist?mode=map${restParams}`;
  const icon = mapMode ? <List /> : <Map />;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={className}
    >
      <Link href={href} aria-label={`Click to see specialist list${mapMode ? ' along with the map' : ''}`}>
        <PillButton
          icon={icon}
          variant="filled"
          colorVariant="orange"
          className="z-10 flex items-center *:gap-0 md:*:gap-2"
        >
          <span className="hidden md:block">{buttonText}</span>
        </PillButton>
      </Link>
    </motion.div>
  );
}

MapLink.propTypes = {
  className: PropTypes.string,
  mapMode: PropTypes.bool,
};
