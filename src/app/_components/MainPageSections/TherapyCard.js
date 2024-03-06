import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { PillButton, Heading, Paragraph } from '@components';
import { buttonColorVariant, buttonVariant } from '../PillButton/style';

export function TherapyCard({ type, description, title, imagePath }) {
  return (
    <div className="z-[2] grid h-full w-full grid-rows-[1fr_fit-content_fit-content] place-items-center gap-2 rounded-[32px] bg-other-white px-4 py-6">
      <Image src={imagePath} width={360} height={180} style={{ width: '100%', height: '100%' }} alt={title} />
      <Heading className="text-center text-h4 font-bold text-primary-700">{title}</Heading>
      <Paragraph className="text-center text-p4 font-bold text-[#FE9E75]">{description}</Paragraph>
      <Link href={`/specialist?type=${type}`}>
        <PillButton variant={buttonVariant.outlined} colorVariant={buttonColorVariant.outlined.blue}>
          Ознайомитись
        </PillButton>
      </Link>
    </div>
  );
}

TherapyCard.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
};
