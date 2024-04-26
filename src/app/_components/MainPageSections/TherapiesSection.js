import PropTypes from 'prop-types';
import { TopWave } from '@components/TopWave';
import { BottomWave } from '@components/BottomWave';
import { TherapyCard } from '@components/MainPageSections/TherapyCard';
import { Heading } from '@components/Typography';
import { TherapyCardPropTypes } from './prop-types';

export function TherapiesSection({ therapies }) {
  return (
    <section className="relative bg-primary-200 bg-blend-multiply">
      <div className="bg-noise w-full h-full bg-cover top-0 left-0 absolute pointer-events-none opacity-40" />
      <TopWave className="h-3 bg-other-white lg:h-12 -translate-y-[0.5px]" />
      <div className="flex flex-col gap-5 p-4 md:p-10 lg:gap-12 lg:p-20">
        <div className="flex flex-col items-center justify-center gap-2">
          <Heading type="h2" className="text-center text-p2 font-bold text-primary-800 lg:text-h3">
            Ти заслуговуєш на гарне самопочуття
          </Heading>
          <Heading type="h3" className="text-p4 font-bold text-primary-600 lg:text-h4">
            Який тип терапії ти потребуєш?
          </Heading>
        </div>
        <div className="grid place-items-center gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {therapies.map(therapy => (
            <TherapyCard key={therapy.id} {...therapy} />
          ))}
        </div>
      </div>
      <BottomWave className="h-5 bg-other-white lg:h-12 translate-y-[0.5px]" />
    </section>
  );
}

TherapiesSection.propTypes = {
  therapies: PropTypes.arrayOf(PropTypes.shape(TherapyCardPropTypes)).isRequired,
};
