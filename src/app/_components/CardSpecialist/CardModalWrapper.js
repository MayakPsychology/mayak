'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@components/Modal';
import { useRouter } from 'next/navigation';
import { cn } from '@utils/cn';
import { useBodyScrollLock } from '@hooks';

export function CardModalWrapper({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleClose() {
    router.back('/specialist');
  }

  // this is to ensure proper modal rendering
  useEffect(() => {
    setIsOpen(true);
  }, []);

  useBodyScrollLock(isOpen, 'y');

  return (
    <Modal
      isOpen
      onClose={handleClose}
      className={cn(
        'fixed bottom-0 top-0 overflow-y-auto rounded-b-none rounded-tl-3xl rounded-tr-3xl lg:static lg:mx-4 lg:max-w-[1000px] lg:rounded-3xl lg:p-[50px]',
        className,
      )}
    >
      {children}
    </Modal>
  );
}

CardModalWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
