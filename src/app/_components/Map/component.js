import dynamic from 'next/dynamic';
import { cn } from '@utils/cn';
import { mapPropTypes } from './prop-types';

const Window = dynamic(() => import('./window'), {
  ssr: false,
});

export function Map({ points, activeSpecialistId, setActiveSpecialist = () => {}, className }) {
  return (
    <div className={cn('z-0 bg-gray-200', className)}>
      <Window
        points={points}
        className={className}
        setActiveSpecialist={setActiveSpecialist}
        activeSpecialistId={activeSpecialistId}
      />
    </div>
  );
}

Map.propTypes = mapPropTypes;
