import PropTypes from 'prop-types';
import { TextInput } from 'react-admin';

function parseCoordinate(value) {
  const number = Number(value);
  return number || value;
}

export function CoordinateInput({ label, source, validate, readOnly = false }) {
  return (
    <TextInput
      InputProps={{
        readOnly,
      }}
      parse={parseCoordinate}
      label={label}
      source={source}
      validate={validate}
    />
  );
}

CoordinateInput.propTypes = {
  label: PropTypes.string,
  source: PropTypes.string,
  readOnly: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
};
