'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { PillButton } from '@/app/_components/PillButton';
import { ClientPortal } from '@/app/_components/ClientPortal';

const ApplicationCloseContext = createContext(() => {});

/** Ask before leaving the application form. Every close path goes through this. */
export const useRequestClose = () => useContext(ApplicationCloseContext);

export function ApplicationCloseProvider({ children, onConfirm }) {
  const [isAsking, setIsAsking] = useState(false);
  const router = useRouter();

  const requestClose = useCallback(() => setIsAsking(true), []);
  const cancel = useCallback(() => setIsAsking(false), []);
  const confirm = useCallback(() => (onConfirm ? onConfirm() : router.push('/')), [onConfirm, router]);

  const value = useMemo(() => requestClose, [requestClose]);

  return (
    <ApplicationCloseContext.Provider value={value}>
      {children}
      {/* ponytail: plain portal overlay instead of <Modal> — Modal's escape handler and body-scroll
          lock fight with the form modal underneath it. */}
      <ClientPortal selector="modal-root" show={isAsking}>
        <div
          className="fixed inset-0 z-[1400] flex items-center justify-center bg-primary-900/40 px-4"
          onClick={cancel}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-label="Ви впевнені що хочете закрити форму?"
            className="w-full max-w-[440px] rounded-2xl bg-other-white p-6 shadow-custom-2"
            onClick={event => event.stopPropagation()}
          >
            <p className="text-center text-p3 font-bold text-primary-700 lg:text-p2">
              Ви впевнені що хочете закрити форму?
            </p>
            <p className="mt-3 text-center text-p4 text-gray-700">Введені дані не буде збережено.</p>
            <div className="mt-6 flex justify-between gap-4">
              <PillButton variant="outlined" colorVariant="blue" aria-label="Продовжити заповнення" onClick={cancel}>
                Скасувати
              </PillButton>
              <PillButton variant="filled" colorVariant="blue" aria-label="Закрити форму" onClick={confirm}>
                Закрити
              </PillButton>
            </div>
          </div>
        </div>
      </ClientPortal>
    </ApplicationCloseContext.Provider>
  );
}

ApplicationCloseProvider.propTypes = {
  children: PropTypes.node,
  onConfirm: PropTypes.func,
};
