import PropTypes from 'prop-types';
import { CardOrganization } from '@components/CardSpecialist/Organization/Card';
import { CardModalWrapper } from '@components/CardSpecialist/CardModalWrapper';
import { organizationPropType } from '@/app/_components/CardSpecialist/prop-types';

export function CardOrganizationExtended({ organization, className }) {
  return (
    <CardModalWrapper
      className="mt-10 w-full max-w-[1080px] pb-12 lg:mt-0 lg:w-[1080px] lg:pb-20"
      key={organization?.id}
    >
      <div className="flex flex-col gap-3 lg:gap-6">
        <CardOrganization organization={organization} className={className} extended />
      </div>
    </CardModalWrapper>
  );
}

CardOrganizationExtended.propTypes = {
  organization: organizationPropType,
  className: PropTypes.string,
};
