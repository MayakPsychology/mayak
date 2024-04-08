import Link from 'next/link';
import PropTypes from 'prop-types';
import { getSocialMediaList } from '@components/Links/socialMediaActions';
import { NavigationUrl } from '@prisma/client';
import { Facebook, Instagram } from '@icons';

export async function SocialLinksList({ className }) {
  const { socialMediaList } = await getSocialMediaList();
  const { INSTAGRAM } = NavigationUrl;
  const links = socialMediaList.map(({ title, href }) => ({
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

SocialLinksList.propTypes = {
  className: PropTypes.string,
};
