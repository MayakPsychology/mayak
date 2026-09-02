'use client';

import PropTypes from 'prop-types';
import { CheckBoxListGroup } from './CheckBoxListGroup';

export function ClientCategoriesGroup({ clientCategories, title, name, otherField, categoryLabels }) {
  return (
    <CheckBoxListGroup
      options={clientCategories}
      title={title}
      name={name}
      labelsField={categoryLabels}
      otherField={otherField}
      otherPlaceholder="Інші категорії (не зазначені у списку вище)"
    />
  );
}

ClientCategoriesGroup.propTypes = {
  clientCategories: PropTypes.array.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  otherField: PropTypes.string,
  categoryLabels: PropTypes.string,
};

ClientCategoriesGroup.defaultProps = {
  title: 'Категорії клієнтів',
  name: 'clients.workingWith',
  otherField: 'clients.workingWithOther',
};
