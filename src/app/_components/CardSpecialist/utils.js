import CheckGreen from '@icons/check-green.svg';
import CrossIcon from '@icons/crossSmall.svg';

export const transformClientCategoryIntoChipListItem =
  ({ workingWith }) =>
    ({ id, name }) => ({
      id,
      title: name,
      icon: workingWith ? <CheckGreen /> : <CrossIcon />,
      containerClassName: workingWith ? 'bg-other-lightGreen' : 'bg-other-lightRed',
      textClassName: workingWith ? 'text-primary-600' : 'text-other-black',
      iconClassName: 'text-xl',
    });
