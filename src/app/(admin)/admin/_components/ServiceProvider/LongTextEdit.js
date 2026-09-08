import PropTypes from 'prop-types';
import { TextInput } from 'react-admin';

import { useActiveRequired } from './hooks/useActiveRequired';

/** Multiline free-text answer coming from the application form. */
export function LongTextEdit({ source, label, validate, className }) {
  const { requiredIfActive } = useActiveRequired();

  return (
    <TextInput
      name={source}
      source={source}
      label={label}
      validate={validate || requiredIfActive}
      className={className}
      fullWidth
      multiline
    />
  );
}

LongTextEdit.propTypes = {
  source: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  className: PropTypes.string,
};
