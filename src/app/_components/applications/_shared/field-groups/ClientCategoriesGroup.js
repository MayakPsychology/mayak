'use client';

import PropTypes from 'prop-types';
import { CheckBoxListGroup } from './CheckBoxListGroup';

export function ClientCategoriesGroup({ clientCategories, title, hints, name, otherField, categoryLabels }) {
  return (
    <CheckBoxListGroup
      options={clientCategories}
      title={title}
      hints={hints}
      name={name}
      labelsField={categoryLabels}
      otherField={otherField}
      otherPlaceholder="Інші категорії (не зазначені у списку вище)"
      columns="mb-6 grid grid-cols-1 gap-2 sm:grid-cols-2"
    />
  );
}

ClientCategoriesGroup.propTypes = {
  clientCategories: PropTypes.array.isRequired,
  title: PropTypes.string,
  hints: PropTypes.array,
  name: PropTypes.string,
  otherField: PropTypes.string,
  categoryLabels: PropTypes.string,
};

ClientCategoriesGroup.defaultProps = {
  title: 'Категорії клієнтів',
  name: 'clients.workingWith',
  otherField: 'clients.workingWithOther',
};
