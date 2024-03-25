'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { mapPropTypes } from './prop-types';

export default function MapWindow({ points, center, zoom }) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map(({ title, latitude, longitude }) => (
        <Marker position={[latitude, longitude]} key={title}>
          {title && <Popup>{title}</Popup>}
        </Marker>
      ))}
    </MapContainer>
  );
}

MapWindow.propTypes = mapPropTypes;
