import Image from 'next/image';
import Link from 'next/link';
import { Heading, Paragraph } from '@components/Typography';
import { PillButton } from '@components/PillButton';
import { TherapyCardPropTypes } from './prop-types';

export function TherapyCard({ type, description, title, imagePath }) {
  return (
    <div className="z-[2] grid h-full w-full grid-rows-[1fr_fit-content_fit-content] place-items-center gap-2 rounded-[32px] bg-other-white px-4 py-6">
      <Image
        src={imagePath}
        width={360}
        height={180}
        style={{ width: '100%', height: '100%' }}
        alt={title}
        priority={true}
      />
      <Heading className="text-center text-h4 font-bold text-primary-700">{title}</Heading>
      <Paragraph className="text-center text-p4 font-bold text-[#FE9E75]">{description}</Paragraph>
      <Link href={`/specialist?type=${type}`}>
        <PillButton variant="outlined" colorVariant="blue">
          Ознайомитись
        </PillButton>
      </Link>
    </div>
  );
}

TherapyCard.propTypes = TherapyCardPropTypes;
