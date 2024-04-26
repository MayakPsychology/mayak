import { Paragraph } from '@components/Typography';
import Plus from '@icons/plus.svg';
import Minus from '@icons/minus.svg';
import { FAQCardPropTypes } from './prop-types';

export function FAQCard({ id, question, answer, checked, onChange }) {
  return (
    <div className="flex w-full max-w-[906px] flex-col gap-2 rounded-[40px] border-[1px] border-gray-600 bg-other-white px-6 py-5">
      <div className="group peer relative flex justify-between">
        <input type="checkbox" className="hidden" id={id} checked={checked} onChange={onChange} />
        <label htmlFor={id} className="cursor-pointer">
          <Paragraph className="text-p1 font-bold text-primary-600">{question}</Paragraph>
        </label>
        <div>
          <label htmlFor={id} className="cursor-pointer">
            <Plus className="group-has-[input:checked]:hidden" />
            <Minus className="hidden group-has-[input:checked]:block" />
          </label>
        </div>
      </div>
      <Paragraph className="hidden text-p2 text-gray-900 peer-has-[input:checked]:inline whitespace-pre-line">{answer}</Paragraph>
    </div>
  );
}

FAQCard.propTypes = FAQCardPropTypes;
