import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

const Context = createContext({
  scrollTo: () => {},
  registerSection: () => {},
});

export default function ScrollableList({ children, className }) {
  const containerRef = useRef(null);
  const sectionMap = useRef(new Map());
  const registerSection = useCallback((name, ref) => {
    if (ref) {
      sectionMap.current.set(name, ref);
    } else {
      sectionMap.current.delete(name);
    }
  }, []);
  const scrollTo = useCallback(name => {
    const section = sectionMap.current.get(name);
    if (section) {
      containerRef.current.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  }, []);
  return (
    <Context.Provider value={{ scrollTo, registerSection }}>
      <div ref={containerRef} className={cn('relative overflow-y-auto', className)}>
        {children}
      </div>
    </Context.Provider>
  );
}

function ScrollTo({ name, children }) {
  const { scrollTo } = useContext(Context);
  const scrollToWrapper = nameToScroll => scrollTo(nameToScroll || name);

  const onClick = () => {
    scrollTo(name);
  };

  return children({
    scrollTo: scrollToWrapper,
    onClick,
  });
}
ScrollableList.ScrollTo = ScrollTo;

function ScrollSection({ children, name, ...attrs }) {
  const ref = useRef(null);
  const { registerSection } = useContext(Context);

  useEffect(() => {
    registerSection(name, ref.current);
    return () => {
      registerSection(name, null);
    };
  }, [name, registerSection]);
  return (
    <div ref={ref} {...attrs}>
      {children}
    </div>
  );
}
ScrollSection.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

ScrollableList.Section = ScrollSection;

ScrollableList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
