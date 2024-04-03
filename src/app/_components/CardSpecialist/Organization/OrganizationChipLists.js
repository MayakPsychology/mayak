import PropTypes from 'prop-types';
import { Caption } from '@components/Typography';
import { ChipList } from '@components/CardSpecialist/ChipList';
import { cn } from '@/utils/cn';

export function OrganizationChipLists({ id, className, expertSpecializations }) {
  const expertSpecializationsChipItems = expertSpecializations.map((el, i) => ({
    id: i,
    text: el.name,
    containerClassName: 'bg-primary-100',
    textClassName: 'text-primary-600',
  }));
  return (
    <div className={cn('flex flex-col gap-3 *:flex *:flex-col *:gap-2', className)}>
      {expertSpecializations?.length && (
        <div>
          <Caption className="text-p4 font-bold text-gray-600">Cпеціалісти</Caption>
          <ChipList
            id={`${id}-expertSpecializations`}
            items={expertSpecializationsChipItems.map(el => ({ ...el, title: el.text, backgroundColor: el.color }))}
          />
        </div>
      )}
    </div>
  );
}

OrganizationChipLists.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  expertSpecializations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};
