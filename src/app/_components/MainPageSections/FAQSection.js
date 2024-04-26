'use client';

import PropTypes from 'prop-types';
import { Heading } from '@components/Typography';
import { TopWave } from '@components/TopWave';
import { FAQCard } from '@components/MainPageSections/FAQCard';
import { useState } from 'react';
import { FAQCardPropTypes } from './prop-types';

export function FAQSection({ faqs }) {
  const [checked, setChecked] = useState(null);
  const onCheck = id => {
    setChecked(checked === id ? null : id);
  }
  return (
    <section className="relative flex flex-col gap-4 bg-secondary-100 pb-[46px] lg:gap-12 lg:pb-[80px]">
      <TopWave className="h-[19px] bg-other-white lg:h-12" />
      <div className="flex flex-col items-center justify-center gap-2">
        <Heading type="h3" className="text-center text-p1 font-bold text-primary-800 lg:text-h3">
          Найчастіші запитання
        </Heading>
      </div>
      <div className="flex w-full flex-col items-center gap-4 px-4">
        {faqs.map(faq => (
          <FAQCard key={faq.id} {...faq} checked={checked === faq.id} onChange={() => onCheck(faq.id)} />
        ))}
      </div>
    </section>
  );
}

FAQSection.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape(FAQCardPropTypes)).isRequired,
};
