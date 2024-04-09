import Link from 'next/link';
import PropTypes from 'prop-types';
import { NavigationUrl } from '@prisma/client';
import { Facebook, Instagram } from '@icons';

export function SocialLinksList({ list, className }) {
  const { INSTAGRAM } = NavigationUrl;
  const links = list?.map(({ title, href }) => ({
    title,
    href,
    svg: title === INSTAGRAM ? <Instagram /> : <Facebook />,
  }));

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

export const linkItemPropType = PropTypes.shape({
  title: PropTypes.string,
  href: PropTypes.string,
});

SocialLinksList.propTypes = {
  list: PropTypes.arrayOf(linkItemPropType),
  className: PropTypes.string,
};
