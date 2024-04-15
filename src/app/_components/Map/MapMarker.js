import { useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

export function MapMarker({ isActive, children, ...props }) {
  const markerRef = useRef();

  useEffect(() => {
    if (isActive) {
      markerRef.current.openPopup();
    } else {
      markerRef.current.closePopup();
    }
  }, [isActive]);

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
