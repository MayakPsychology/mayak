'use client';

import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useHintContext } from '@components/Hint';
import { cn } from '@utils/cn';
import { screens } from '@/app/styles/tailwind/ui';
import { getSpecialistURL } from '../Specialists/utils';

export function CardWrapper({ children, className, id, type, extended = false }) {
  const router = useRouter();
  const matches = useMediaQuery(`(max-width: ${screens.md})`);
  const { toggle } = useHintContext();

  const handleClick = () => {
    router.push(getSpecialistURL({type, id}), { scroll: false });
    toggle();
  };

  const hasClickHandler = matches && !extended;

  return (
    <div
      className={cn(
        'gap-4 transition-all md:grid md:grid-cols-[150px_auto] lg:grid-cols-[200px_auto]',
        {
          'cursor-pointer md:cursor-auto': hasClickHandler
        },
        className,
      )}
      onClick={hasClickHandler ? handleClick : undefined}
    >
      {children}
    </div>
  );
}

CardWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  extended: PropTypes.bool,
};
