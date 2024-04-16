import { useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import { useWindowResize } from '@/app/_hooks/useWindowResize';

export function MapMarker({ isActive, children, ...props }) {
  const markerRef = useRef();

  useEffect(() => {
    const marker = markerRef?.current;

    if (isActive) {
      marker.openPopup();
    } else {
      marker.closePopup();
    }

    return () => {
      marker?.closePopup();
    };
  }, [isActive]);

  const { width: screenWidth } = useWindowResize();

  useEffect(() => {
    markerRef?.current.closePopup();
  }, [screenWidth]);

  return (
    <Marker {...props} ref={markerRef}>
      <Popup>{children}</Popup>
    </Marker>
  );
}

MapMarker.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node,
  props: PropTypes.object,
};
