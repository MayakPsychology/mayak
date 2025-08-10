import { BooleanInput } from 'react-admin';
import PropTypes from 'prop-types';

export function ActivationForm({ label, className }) {
  return <BooleanInput name="isActive" source="isActive" label={label} className={className} defaultValue={true} />;
}

ActivationForm.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};
