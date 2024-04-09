'use client';

import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useHintContext } from '@components/Hint';
import { cn } from '@utils/cn';
import { screens } from '@/app/styles/tailwind/ui';

export function CardWrapper({ children, className, id, type }) {
  const router = useRouter();
  const matches = useMediaQuery(`(max-width: ${screens.md})`);
  const { toggle } = useHintContext();
  const pathname = usePathname();

  const isExtendedCardOpened = pathname === `/specialist/${id}`;

  const handleClick = () => {
    router.push(`/specialist/${id}?type=${type}`, { scroll: false });
    toggle();
  };

  const hasClickHandler = matches && !isExtendedCardOpened;

  return (
    <div
      className={cn(
        'transition-all md:flex md:cursor-auto',
        hasClickHandler ? 'cursor-pointer' : 'cursor-default',
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
};
