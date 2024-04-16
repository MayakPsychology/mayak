import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

const classes = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h4',
};

export function Heading({ children, type = 'h1', className }) {
  return React.createElement(
    type,
    {
      className: cn('font-montserrat text-primary-900', classes[type], className),
    },
    children,
  );
}

Heading.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
  className: PropTypes.string,
};
