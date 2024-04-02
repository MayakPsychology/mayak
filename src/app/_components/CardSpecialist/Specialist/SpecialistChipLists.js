import PropTypes from 'prop-types';
import { Caption } from '@components/Typography';
import { ChipList } from '@components/CardSpecialist/ChipList';
import { cn } from '@/utils/cn';
import presets from '@/app/styles/tailwind';

function makeSpecializationsMethodsCaption(specializations) {
  const hasPsychotherapist = specializations.includes('Психотерапевт');
  const hasPsychologist = specializations.includes('Психолог');

  if (hasPsychotherapist && !hasPsychologist) {
    return 'Методи терапії';
  }
  if (!hasPsychotherapist && hasPsychologist) {
    return 'Спеціалізація';
  }
  if (hasPsychotherapist && hasPsychologist) {
    return 'Напрями і методи';
  }
  return '';
}

export function SpecialistChipLists({ id, className, specializationsList, specializationMethods }) {
  const specializationsMethodsCaption = makeSpecializationsMethodsCaption(specializationsList);
  const specializationsMethodsItems = specializationMethods.map(el => ({
    id: el.id,
    title: el.title,
    backgroundColor: presets.theme.colors.primary[100],
    textColor: presets.theme.colors.primary[600],
    tooltipText: el.description,
  }));

  return (
    <div className={cn('flex flex-col gap-3 *:flex *:flex-col *:gap-2', className)}>
      {/* If neither "Психотерапевт" nor "Психолог" are included
          section should not render */}
      {specializationsMethodsCaption && (
        <div>
          <Caption className="text-p4 font-bold text-gray-600">{specializationsMethodsCaption}</Caption>
          <ChipList id={`${id}-specializationMethods`} items={specializationsMethodsItems} />
        </div>
      )}
    </div>
  );
}

SpecialistChipLists.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  specializationsList: PropTypes.arrayOf(PropTypes.string),
  specializationMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
};
