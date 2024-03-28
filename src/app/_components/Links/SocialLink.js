import Link from 'next/link';
import PropTypes from 'prop-types';

export function SocialLink({ links, className }) {
  return (
    <>
      {links?.map((link, idx) => (
        <Link
          key={idx}
          role="listitem"
          href={link?.href}
          aria-label={`Open our ${link?.title} on click`}
          target="_blank"
          noopener="true"
          noreferrer="true"
          className={className}
        >
          {link?.svg}
        </Link>
      ))}
    </>
  );
}

SocialLink.propTypes = {
  links: PropTypes.array,
  className: PropTypes.string,
};
