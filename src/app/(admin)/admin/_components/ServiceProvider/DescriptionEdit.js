import PropTypes from 'prop-types';
import { TextInput } from 'react-admin';

import { useActiveRequired } from './hooks/useActiveRequired';

export function DescriptionEdit({ validate, className }) {
  const { requiredIfActive } = useActiveRequired();

  return (
    <TextInput
      name="description"
      source="description"
      label="Опис"
      validate={validate || requiredIfActive}
      className={className}
      fullWidth
      multiline
    />
  );
}

DescriptionEdit.propTypes = {
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  className: PropTypes.string,
};
