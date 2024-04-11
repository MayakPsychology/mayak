'use client';

import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { motion } from 'framer-motion';
import { useBodyScrollLock, useKeyEvent } from '@hooks';
import { isEscapeKey } from '@utils/dom';
import { ClientPortal } from '../ClientPortal';
import { ModalCloseButton } from './ModalCloseButton';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  isBlurBackground = true,
  isCloseButton = true,
  layout = true,
}) => {
  useKeyEvent({
    key: isEscapeKey,
    handler: onClose,
    event: 'keydown',
  });

  useBodyScrollLock(isOpen);

  const blurBackground = <div className="fixed left-0 top-0 z-[55] h-full w-full backdrop-blur-sm" />;

  const motionData = {
    initial: {
      opacity: 0.9,
      y: '20vh',
      transition: { duration: 0.2 },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      y: '10vh',
      transition: { duration: 0.2 },
    },
  };

  return (
    <ClientPortal selector="modal-root" show={isOpen}>
      {isOpen && (
        <>
          {isBlurBackground && blurBackground}
          <div
            className="fixed bottom-0 left-0 top-0 z-[75] grid w-full place-content-center lg:top-1/2 lg:h-[75vh] lg:-translate-y-1/2"
            onClick={onClose}
          >
            <motion.div
              className={cn(
                layout &&
                  'z-[99] flex flex-col overflow-hidden rounded-xl bg-other-white px-4 py-[18px] shadow-custom-2 md:p-6',
                className,
              )}
              onClick={e => {
                e.stopPropagation();
              }}
              {...motionData}
            >
              {isCloseButton && (
                <div className="flex items-center justify-center text-center">
                  <p className="w-full pl-2 pr-2 text-p2 md:pl-6 md:pr-6">{title}</p>

                  <ModalCloseButton onClose={onClose} />
                </div>
              )}
              <div className="mt-4 overflow-y-auto pr-5">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </ClientPortal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  layout: PropTypes.bool,
  isBlurBackground: PropTypes.bool,
  isCloseButton: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
};
