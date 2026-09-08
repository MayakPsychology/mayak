'use client';

import PropTypes from 'prop-types';
import { TextAreaField } from './TextAreaField';

export function DescriptionField({ label, hint, placeholder }) {
  return (
    <TextAreaField
      name="description"
      label={label}
      hints={hint ? [hint] : undefined}
      placeholder={placeholder}
      maxLength={5000}
    />
  );
}

DescriptionField.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  placeholder: PropTypes.string,
};
DescriptionField.defaultProps = {
  label: 'Що ми можемо додати про Вас у пункт Опис?',
  placeholder: 'Ваша відповідь',
};
