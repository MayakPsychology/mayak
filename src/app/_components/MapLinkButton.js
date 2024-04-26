'use client';

import { PillButton } from '@components/PillButton';
import { List, Map } from '@icons';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function MapLinkButton({ mapMode = false, enableAnimation = true, restParams = '', className }) {
  const buttonText = mapMode ? 'Показати список' : 'Шукати на карті';
  const href = mapMode ? '/specialist' : `/specialist?mode=map${restParams}`;
  const icon = mapMode ? <List /> : <Map />;

  const motionData = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
    },
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  };

  const animationData = enableAnimation ? motionData : {};

  return (
    <motion.div {...animationData} className={className}>
      <Link href={href} aria-label={`Click to see specialist list${mapMode ? ' along with the map' : ''}`}>
        <PillButton
          icon={icon}
          variant="filled"
          colorVariant="orange"
          forceShowIcon
          className="z-10 flex items-center *:*:mr-0 *:gap-0 md:*:gap-2"
        >
          <span className="hidden md:block">{buttonText}</span>
        </PillButton>
      </Link>
    </motion.div>
  );
}

MapLinkButton.propTypes = {
  className: PropTypes.string,
  mapMode: PropTypes.bool,
  enableAnimation: PropTypes.bool,
  restParams: PropTypes.string,
};
