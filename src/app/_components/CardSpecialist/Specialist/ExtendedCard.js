import PropTypes from 'prop-types';
import { CardSpecialist } from '@components/CardSpecialist/Specialist/Card';
import { CardModalWrapper } from '@components/CardSpecialist/CardModalWrapper';
import { specialistPropType } from '@components/CardSpecialist/prop-types';

export function CardSpecialistExtended({ specialist, className }) {
  return (
    <CardModalWrapper
      className="mt-10 w-full max-w-[1080px] pb-12 lg:mt-0 lg:h-full lg:w-[1080px] lg:pb-20"
      key={specialist.id}
    >
      <div className="flex flex-col gap-3 lg:gap-6">
        <CardSpecialist specialist={specialist} className={className} extended />
      </div>
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};
