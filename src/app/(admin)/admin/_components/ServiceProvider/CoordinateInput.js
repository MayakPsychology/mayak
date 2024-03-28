import PropTypes from 'prop-types';
import { TextInput } from 'react-admin';

function parseCoordinate(value) {
  const number = Number(value);
  return number || value;
}

export function CoordinateInput({ label, source, readOnly = false }) {
  return (
    <TextInput
      InputProps={{
        readOnly,
      }}
      parse={parseCoordinate}
      label={label}
      source={source}
    />
  );
}

CoordinateInput.propTypes = {
  label: PropTypes.string,
  source: PropTypes.string,
  readOnly: PropTypes.bool,
};
