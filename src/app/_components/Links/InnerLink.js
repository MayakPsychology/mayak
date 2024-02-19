import React from 'react';
import Link from 'next/link';
import p from 'prop-types';
import { cn } from '@utils/cn';

export function InnerLink({ items, className }) {
  return (
    <div className="flex list-none gap-4 text-primary-700">
      {items?.map((link, idx) => (
        <Link
          key={idx}
          role="listitem"
          href={link.href}
          aria-label={`Open ${link.title} on click`}
          target="_blank"
          noopener="true"
          noreferrer="true"
          className={cn(className)}
        >
          {link?.title}
        </Link>
      ))}
    </div>
  );
}

InnerLink.propTypes = {
  items: p.array,
  className: p.string,
};
