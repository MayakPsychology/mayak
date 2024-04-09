import PropTypes from 'prop-types';
import { Map } from '@components/Map';
import { CardSpecialist } from '@components/CardSpecialist/Specialist/Card';
import { CardModalWrapper } from '@components/CardSpecialist/CardModalWrapper';
import { specialistPropType } from '@components/CardSpecialist/prop-types';
import { addressesToPoints } from '@/utils/common';

export function CardSpecialistExtended({ specialist, className }) {
  const points = addressesToPoints(specialist.addresses);
  return (
    <CardModalWrapper className="mt-10 h-full w-full max-w-[1080px] lg:mt-0 lg:w-[1080px]" key={specialist.id}>
      <div className="flex flex-col gap-3 lg:gap-6">
        <CardSpecialist specialist={specialist} className={className} extended />
        {points?.length ? (
          <Map
            points={points}
            center={[points[0].latitude, points[0].longitude]}
            zoom={13}
            className="h-[198px] w-full lg:h-[232px]"
          />
        ) : null}
      </div>
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};
