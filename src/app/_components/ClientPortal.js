'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

export const ClientPortal = ({ children, selector, show }) => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);

  return show && ref.current ? createPortal(<AnimatePresence>{children}</AnimatePresence>, ref.current) : null;
};

ClientPortal.propTypes = {
  children: PropTypes.node.isRequired,
  selector: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};
