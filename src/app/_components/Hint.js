'use client';

import { cloneElement, createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { ClientPortal } from './ClientPortal';

const HintContext = createContext();

export function Hint({ children }) {
  const [openName, setOpenName] = useState('');
  const toggle = name => (openName === name ? setOpenName('') : setOpenName(name));

  return <HintContext.Provider value={{ toggle, openName }}>{children}</HintContext.Provider>;
}

export function Show({ children, opens: opensWindowName, actions }) {
  const { toggle } = useContext(HintContext);

  // close hints when window is scrolled
  useEffect(() => {
    const handleScroll = () => {
      toggle('');
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [toggle]);

  return cloneElement(children, {
    id: opensWindowName,
    onClick: e => {
      e.stopPropagation();
      toggle(opensWindowName);
      if (actions?.onClick) actions.onClick(e);
    },
    onMouseEnter: e => {
      e.stopPropagation();
      toggle(opensWindowName);
      if (actions?.onMouseEnter) actions.onMouseEnter(e);
    },
    onMouseLeave: e => {
      e.stopPropagation();
      toggle('');
      if (actions?.onMouseLeave) actions.onMouseLeave(e);
    },
  });
}

export function Window({ children, name, className }) {
  const { openName } = useContext(HintContext);

  return (
    <ClientPortal selector={name} show={name === openName}>
      <div
        className={cn(
          'pointer-events-none absolute z-[100] inline-flex items-center justify-center gap-[10px] rounded' +
            ' bg-other-white bg-opacity-60 px-1 py-2 text-center text-[10px] font-medium leading-[0.938rem]' +
            ' shadow-custom-3 backdrop-blur-[3px] transition-all',
          className,
        )}
      >
        {children}
      </div>
    </ClientPortal>
  );
}

export function useHintContext() {
  const context = useContext(HintContext);
  if (context === undefined) throw new Error('HintContext was used outside HintProvider');
  return context;
}

Window.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Hint.propTypes = {
  children: PropTypes.node,
};

Show.propTypes = {
  children: PropTypes.node.isRequired,
  opens: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  }),
};
