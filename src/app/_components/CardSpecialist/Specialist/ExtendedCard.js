import PropTypes from 'prop-types';
import { CardSpecialist } from '@components/CardSpecialist/Specialist/Card';
import { CardModalWrapper } from '@components/CardSpecialist/CardModalWrapper';
import { specialistPropType } from '@components/CardSpecialist/prop-types';

export function CardSpecialistExtended({ specialist, className }) {
  return (
    <CardModalWrapper className="mt-10 w-full max-w-[1080px] lg:mt-0 lg:w-[1080px]" key={specialist.id}>
      <CardSpecialist specialist={specialist} className={className} extended />
    </CardModalWrapper>
  );
}

CardSpecialistExtended.propTypes = {
  specialist: specialistPropType,
  className: PropTypes.string,
};
