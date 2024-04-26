'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import { MapLinkButton } from './MapLinkButton';

export function MapLink({ mapMode = false, enableAnimation = true, className }) {
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const restParams = params ? `&${params}` : '';

  return <MapLinkButton mapMode={mapMode}
    enableAnimation={enableAnimation}
    className={className}
    restParams={restParams}
  />
}

MapLink.propTypes = {
  className: PropTypes.string,
  mapMode: PropTypes.bool,
  enableAnimation: PropTypes.bool,
};
