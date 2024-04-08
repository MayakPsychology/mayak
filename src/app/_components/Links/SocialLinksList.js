'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getSocialMediaList } from '@components/Links/socialMediaActions';

export function SocialLinksList({ className }) {
  const [socialMediaList, setSocialMediaList] = useState(null);

  useEffect(() => {
    getSocialMediaList().then(data => {
      setSocialMediaList(data.socialMediaList);
    });
  }, []);

  return (
    <>
      {socialMediaList &&
        socialMediaList?.map((link, idx) => (
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
