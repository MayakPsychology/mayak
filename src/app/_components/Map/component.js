import dynamic from 'next/dynamic';
import { cn } from '@utils/cn';
import { mapPropTypes } from './prop-types';

export function Map({ points, className }) {
  const Window = dynamic(() => import('./window'), {
    loading: () => <p className={cn('bg-gray-200', className)} />,
    ssr: false,
  });

  return <Window points={points} className={className} />;
}

Map.propTypes = mapPropTypes;
