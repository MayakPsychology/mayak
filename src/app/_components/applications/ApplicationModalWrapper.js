'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { Modal } from '@components/Modal';
import { useRouter } from 'next/navigation';
import { cn } from '@utils/cn';

export function ApplicationModalWrapper({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function handleClose() {
    setIsOpen(false);
    router.push('/');
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={cn(
        'rounded-b-none rounded-tl-3xl rounded-tr-3xl lg:static lg:mx-4 lg:h-auto lg:max-w-[1000px] lg:rounded-3xl lg:p-[50px]',
        className,
      )}
    >
      {children}
    </Modal>
  );
}

ApplicationModalWrapper.propTypes = { children: PropTypes.node, className: PropTypes.string };
