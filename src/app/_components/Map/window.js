'use client';

import { divIcon } from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import { CustomMapMarker as CustomMarker } from '@icons';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@utils/cn';
import { MapMarker } from '@components/Map/MapMarker';
import PropTypes from 'prop-types';
import { calculateMapBounds } from '@utils/leaflet';
import { useWindowResize } from '@/app/_hooks/useWindowResize';
import { mapPropTypes } from './prop-types';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const LVIV_MAP_BOUNDS = [
  [49.75826, 23.95324],
  [49.93826, 24.12324],
];

const styledMarkerIcon = colorClass =>
  divIcon({
    html: ReactDOMServer.renderToString(
      <CustomMarker className={cn('transition-all hover:scale-125', colorClass)} />,
      {},
    ),
    iconAnchor: [20, 40],
    popupAnchor: [-2, -40],
  });

function SetBounds({ points, children }) {
  const map = useMap();

  useEffect(() => {
    const calculatedBounds = calculateMapBounds(points);
    const bounds = calculatedBounds.length >= 2 ? calculatedBounds : LVIV_MAP_BOUNDS;
    map.fitBounds(bounds);
  }, [map, points]);

  return <>{children}</>;
}

SetBounds.propTypes = {
  points: PropTypes.array,
  children: PropTypes.node,
};

export default function MapWindow({ points, activeSpecialistId, setActiveSpecialist, className }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { width: screenWidth } = useWindowResize();
  const mapRef = useRef(null);

  useEffect(() => {
    setSelectedMarker(null);
  }, [screenWidth]);

  const markerEventHandlers = {
    click: ({ specialistId, index }) => {
      setActiveSpecialist(specialistId);
      setSelectedMarker(`${specialistId}-${index}`);
    },
    popupclose: () => {
      setActiveSpecialist(null);
      setSelectedMarker(null);
    },
  };

  const markers = points
    .filter(point => point.title)
    .map(({ title, latitude, longitude, meta }) => {
      const { specialistId, index } = meta;

      return (
        <MapMarker
          position={[latitude, longitude]}
          key={`${latitude}-${longitude}`}
          eventHandlers={{
            click: () => markerEventHandlers.click({ specialistId, index }),
            popupclose: () => markerEventHandlers.popupclose(),
          }}
          icon={styledMarkerIcon(
            index === selectedMarker || specialistId === activeSpecialistId
              ? 'text-secondary-400 scale-125'
              : 'text-primary-500',
          )}
          map={mapRef}
          isActive={index === selectedMarker && specialistId === activeSpecialistId}
          riseOnHover
        >
          {title}
        </MapMarker>
      );
    });

  return (
    <MapContainer scrollWheelZoom={false} className={className} ref={mapRef}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetBounds points={points}>{markers}</SetBounds>
    </MapContainer>
  );
}

MapWindow.propTypes = mapPropTypes;
