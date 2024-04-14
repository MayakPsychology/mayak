'use client';

import { divIcon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { calculateMapBounds } from '@utils/leaflet';
import ReactDOMServer from 'react-dom/server';
import { CustomMapMarker as CustomMarker } from '@icons';
import { useState } from 'react';
import { cn } from '@utils/cn';
import { mapPropTypes } from './prop-types';

const styledMarkerIcon = colorClass =>
  divIcon({
    html: ReactDOMServer.renderToString(
      <CustomMarker className={cn('transition-all hover:scale-125', colorClass)} />,
      {},
    ),
    iconAnchor: [20, 40],
    popupAnchor: [-2, -40],
  });

export default function MapWindow({ points, activeSpecialistId, setActiveSpecialist, className }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const bounds = calculateMapBounds(points);

  const markerEventHandlers = {
    click: ({ specialistId, index }) => {
      setActiveSpecialist(specialistId);
      setSelectedMarker(index);
    },
    popupclose: () => {
      setActiveSpecialist(null);
      setSelectedMarker(null);
    },
  };

  return (
    <MapContainer bounds={bounds} scrollWheelZoom={false} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points
        .filter(point => point.title)
        .map(({ title, latitude, longitude, specialistId = null }, index) => (
          <Marker
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
          >
            {title && <Popup>{title}</Popup>}
          </Marker>
        ))}
    </MapContainer>
  );
}

MapWindow.propTypes = mapPropTypes;
