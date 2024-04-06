'use client';

import { Caption } from '@components/Typography';
import { ChipList } from '@components/CardSpecialist/ChipList';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { transformClientCategoryIntoChipListItem } from '@utils/common';

export function ClientCategoryList({ id, clientCategories, isWorkWith, className }) {
  if (!clientCategories?.length) return null;

  const clientCategoryCallback = transformClientCategoryIntoChipListItem({ workingWith: isWorkWith });
  const items = clientCategories.map(clientCategoryCallback);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
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
  className: PropTypes.string,
};
