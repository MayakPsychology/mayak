'use client';

import PropTypes from 'prop-types';
import { SpecialistListMain } from '@components/Specialists/SpecialistListMain';
import { useSearchParams } from 'next/navigation';
import { SpecialistListWithMap } from '@components/Specialists/SpecialistListWithMap';

export function SpecialistListWrapper({ className }) {
  const searchParams = useSearchParams();
  const isMapMode = searchParams.get('mode') === 'map';

  return (
    <section className={className}>
      {isMapMode ? <SpecialistListWithMap mapMode={isMapMode} /> : <SpecialistListMain mapMode={isMapMode} />}
    </section>
  );
}

SpecialistListWrapper.propTypes = {
  className: PropTypes.string,
};
