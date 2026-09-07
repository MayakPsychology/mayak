import Link from 'next/link';
import PropTypes from 'prop-types';
import { cn } from '@utils/cn';
import { specialistFiltersConfig, specialistTypeEnum } from '@components/Specialists/Filters/utils';

export function InnerLink({ items, className, onClick }) {
  return (
    <>
      {items?.map((link, idx) => (
        <Link
          key={idx}
          role="listitem"
          href={{
            pathname: link.href,
            query: {
              [specialistFiltersConfig.specialistType.filterKey]: specialistTypeEnum.REQUEST,
            },
          }}
          aria-label={`Open ${link.title} on click`}
          className={cn(className, 'inline-flex items-center gap-2')}
          onClick={onClick}
        >
          {link?.title}
          {link?.badge && (
            <span className="rounded-full bg-secondary-400 px-2 py-0.5 text-[10px] font-bold uppercase leading-4 tracking-wide text-other-white">
              {link.badge}
            </span>
          )}
        </Link>
      ))}
    </>
  );
}

InnerLink.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
