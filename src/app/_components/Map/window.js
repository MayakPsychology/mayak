'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { calculateMapBounds } from '@utils/leaflet';
import { mapPropTypes } from './prop-types';

export default function MapWindow({ points, className }) {
  const bounds = calculateMapBounds(points);

  return (
    <MapContainer bounds={bounds} scrollWheelZoom={false} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points
        .filter(point => point.title)
        .map(({ title, latitude, longitude }) => (
          <Marker position={[latitude, longitude]} key={`${latitude}-${longitude}`}>
            {title && <Popup>{title}</Popup>}
          </Marker>
        ))}
    </MapContainer>
  );
}

MapWindow.propTypes = mapPropTypes;
