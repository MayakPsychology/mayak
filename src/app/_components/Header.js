'use client';

import Link from 'next/link';
import { BurgerIcon, Logo } from '@icons';
import siteNav from '@config/siteNav';
import { cn } from '@utils/cn';
import { InnerLink, linkItemPropType, SocialLinksList } from '@components/Links';
import PropTypes from 'prop-types';
import { donationDetailsPropTypes, DonationSection } from '@components/DonationSection';
import useToggleState from '@/app/_hooks/useToggleState';
import MobileMenuDrawer from './MobileMenuDrawer';
import { FeedbackAction } from './FeedbackAction';

const flexBetween = 'flex flex-row items-center justify-between';
const flexCenter = 'flex flex-row items-center justify-center';
const basicLink = 'no-underline list-none cursor-pointer';
const listItemText = 'text-p2 font-bold';
const listItemTextHover = 'text-primary-700 hover:text-primary-500';

export function Header({ socialMediaLinksList, donationDetails }) {
  const { innerLinks } = siteNav;

  const [isMenuOpen, {open: openDrawer, close: closeDrawer}] = useToggleState(false);

  const showDonationDetails = donationDetails && donationDetails.isDonationEnabled;

  return (
    <header className="z-50">
      {/* Desktop Donation Section */}
      {showDonationDetails && (
        <DonationSection
          donationDetails={donationDetails}
          className="hidden items-center justify-end gap-[24px] py-[12px] pe-[80px] ps-[104px] lg:flex"
        />
      )}
      {/* this element is used to fill the space under navbar on mobile screens */}
      <div className="border-t-[1px] p-4 lg:hidden">
        <div className="h-9" />
      </div>
      <nav
        className={cn(
          flexBetween,
          'fixed top-0 z-10 w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-4 py-4 lg:static lg:px-20',
        )}
      >
        <Link href="/" aria-label="Reload main page on logo click" className={basicLink}>
          <Logo
            alt="Mayak logo"
            aria-label="Mayak logo"
            priority="true"
            className="h-9 w-[66px] transition-all lg:h-[74px] lg:w-[129px]"
          />
        </Link>
        <div className={cn(flexCenter, 'ml-auto hidden gap-6 lg:flex')}>
          <div className="flex list-none gap-4 text-primary-700">
            <InnerLink
              items={innerLinks}
              className={cn(basicLink, listItemTextHover, listItemText, 'gap-4 px-3 py-1 transition-all')}
            />
          </div>
          <SocialLinksList list={socialMediaLinksList} className="text-primary-700 hover:text-primary-500" />
          <FeedbackAction />
        </div>
        {/* Burger menu */}
        <button className='flex'>
          <BurgerIcon className="block transition-all lg:hidden" onClick={openDrawer} />
        </button>
        <MobileMenuDrawer
          isOpen={isMenuOpen}
          socialMediaLinksList={socialMediaLinksList}
          onClose={closeDrawer}
          donationDetails={donationDetails}
        />
      </nav>
    </header>
  );
}

Header.propTypes = {
  socialMediaLinksList: PropTypes.arrayOf(linkItemPropType),
  donationDetails: donationDetailsPropTypes,
};
