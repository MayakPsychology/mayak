import Link from 'next/link';
import PropTypes from 'prop-types';
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
          className={className}
          onClick={onClick}
        >
          {link?.title}
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
