import dynamic from 'next/dynamic';
import { mapPropTypes } from './prop-types';

export function Map({ points, center, zoom, className }) {
  const Window = dynamic(() => import('./window'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return <Window points={points} center={center} zoom={zoom} className={className} />;
}

Map.propTypes = mapPropTypes;
