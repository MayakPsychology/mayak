'use client';

import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { PillButton } from '@/app/_components/PillButton';

export function ApplicationSuccess({ title, description }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <h2 className="text-p2 font-bold text-primary-700 lg:text-h4">{title}</h2>
      <p className="max-w-[480px] text-p4 text-gray-700 lg:text-p3">{description}</p>
      <PillButton variant="filled" colorVariant="blue" onClick={() => router.push('/')}>
        На головну
      </PillButton>
    </div>
  );
}

ApplicationSuccess.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

ApplicationSuccess.defaultProps = {
  title: 'Заявку успішно надіслано',
  description: 'Дякуємо! Ми розглянемо вашу заявку та зв’яжемося з вами найближчим часом.',
};
