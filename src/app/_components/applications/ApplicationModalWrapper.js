'use client';

import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import { Modal } from '@components/Modal';
import { useRouter } from 'next/navigation';
import { cn } from '@utils/cn';
import { ApplicationCloseProvider, useRequestClose } from './_shared/ApplicationClose';

function ApplicationModal({ isOpen, children, className }) {
  // Backdrop click and Escape land here too, so every close path asks for confirmation.
  const requestClose = useRequestClose();

  return (
    <Modal
      isOpen={isOpen}
      onClose={requestClose}
      isCloseButton={false}
      className={cn('w-full max-w-[744px] bg-primary-200 lg:rounded-3xl lg:p-[50px]', className)}
      classNames={{ container: 'mt-0' }}
    >
      {children}
    </Modal>
  );
}

ApplicationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export function ApplicationModalWrapper({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    router.push('/');
  }, [router]);

  return (
    <ApplicationCloseProvider onConfirm={close}>
      <ApplicationModal isOpen={isOpen} className={className}>
        {children}
      </ApplicationModal>
    </ApplicationCloseProvider>
  );
}

ApplicationModalWrapper.propTypes = { children: PropTypes.node, className: PropTypes.string };
