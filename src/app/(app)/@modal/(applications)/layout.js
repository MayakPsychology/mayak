'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { ApplicationModalWrapper } from '@/app/_components/applications/ApplicationModalWrapper';

export default function ModalApplicationLayout({ children }) {
  return <ApplicationModalWrapper>{children}</ApplicationModalWrapper>;
}
ModalApplicationLayout.propTypes = {
  children: PropTypes.node,
};
