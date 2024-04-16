import { useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

export function MapMarker({ isActive, children, ...props }) {
  const markerRef = useRef();

  useEffect(() => {
    const marker = markerRef.current;
    // marker.closePopup();
    // if (isActive) {
    //   marker.openPopup();
    // }
    // else {
    //   marker.closePopup();
    // }
    //
    return () => {
      if (marker) {
        marker.closePopup();
      }
    };
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
