'use client';

import { Caption } from '@components/Typography';
import { ChipList } from '@components/CardSpecialist/ChipList';
import PropTypes from 'prop-types';
import CheckGreen from '@icons/check-green.svg';
import CrossIcon from '@icons/crossSmall.svg';

export function ClientCategoryList({ id, clientCategories, isWorkWith }) {
  if (!clientCategories?.length) return null;

  const items = clientCategories.map(({ id: categoryId, name }) => ({
    id: categoryId,
    title: name,
    icon: isWorkWith ? <CheckGreen /> : <CrossIcon />,
    containerClassName: isWorkWith ? 'bg-other-lightGreen' : 'bg-other-lightRed',
    textClassName: isWorkWith ? 'text-primary-600' : 'text-other-black',
    iconClassName: 'text-xl',
  }));

  return (
    <div className="flex flex-col gap-2">
      <Caption className="text-p4 font-bold text-gray-600">{isWorkWith ? 'працює з' : 'не працює з'}</Caption>
      <ChipList id={`${id}-clientCategories`} items={items} />
    </div>
  );
}

ClientCategoryList.propTypes = {
  id: PropTypes.string,
  clientCategories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string, isWorkWith: PropTypes.bool }),
  ),
  isWorkWith: PropTypes.bool,
};
