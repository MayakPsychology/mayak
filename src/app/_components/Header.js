'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { BurgerIcon, HeaderCloseIcon, Logo } from '@icons';
import siteNav from '@config/siteNav';
import { cn } from '@utils/cn';
import { InnerLink, linkItemPropType, SocialLinksList } from '@components/Links';
import { PillButton } from '@components/PillButton';
import FeedbackModal from '@components/Feedback';
import PropTypes from 'prop-types';
import { DonateModal, donationDetailsPropTypes, DonationSection } from '@components/DonationSection';
import { useBodyScrollLock, useKeyEvent } from '@hooks';
import { isEscapeKey } from '@utils/dom';

const flexBetween = 'flex flex-row items-center justify-between';
const flexCenter = 'flex flex-row items-center justify-center';
const basicLink = 'no-underline list-none cursor-pointer';
const listItemText = 'text-p2 font-bold';
const listItemTextHover = 'text-primary-700 hover:text-primary-500';

export function Header({ socialMediaLinksList, donationDetails }) {
  const { innerLinks } = siteNav;

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const [isDonateModalOpen, setDonateModalOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(state => !state);
  }, [setMenuOpen]);

  useKeyEvent({
    key: isEscapeKey,
    handler: () => setMenuOpen(false),
    event: 'keydown',
  });

  const toggleFeedback = useCallback(() => {
    setFeedbackOpen(prevState => !prevState);
  }, [setFeedbackOpen]);

  const toggleDonateModal = useCallback(() => {
    setDonateModalOpen(prevState => !prevState);
  }, [setDonateModalOpen]);

  const showDonationDetails = donationDetails && donationDetails.isDonationEnabled;

  useBodyScrollLock(isMenuOpen, 'y');

  return (
    <header className="z-50">
      {/* Desktop Donation Section */}
      {showDonationDetails && (
        <DonationSection
          onDonateClick={toggleDonateModal}
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
          <PillButton
            variant="outlined"
            colorVariant="blue"
            onClick={toggleFeedback}
            aria-label="Click to fill feedback form"
          >
            Зворотній звʼязок
          </PillButton>
        </div>
        {/* Burger menu */}
        <span tabIndex={0}>
          <BurgerIcon className="block transition-all lg:hidden" onClick={toggleMenu} />
        </span>
        <div
          className={cn(
            'absolute inset-0 flex h-dvh w-dvw flex-col bg-other-black transition-all lg:hidden',
            isMenuOpen === false && 'hidden',
          )}
        >
          <div className={cn(flexBetween, 'w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-4 py-4')}>
            <Link
              href="/"
              aria-label="Reload main page on logo click"
              className={cn(basicLink, 'transition-all')}
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <Logo
                alt="Mayak logo"
                aria-label="Mayak logo"
                priority="true"
                className="h-[36px] w-[66px] lg:h-[74px] lg:w-[129px]"
              />
            </Link>
            <span tabIndex={0}>
              <HeaderCloseIcon onClick={toggleMenu} className="transition-all" />
            </span>
          </div>
          <div className="flex grow flex-col overflow-y-auto bg-other-white p-4">
            <div className="flex flex-col items-center">
              <InnerLink
                items={innerLinks}
                onClick={toggleMenu}
                className={cn(
                  basicLink,
                  listItemTextHover,
                  listItemText,
                  'w-full border-b-[1px] border-gray-600 px-3 py-1 pb-1 pt-3 text-center transition-all',
                )}
              />
            </div>
            <PillButton
              variant="outlined"
              colorVariant="blue"
              onClick={toggleFeedback}
              aria-label="Click to fill feedback form"
              className="my-8"
            >
              Зворотній звʼязок
            </PillButton>
            <div className={cn('mx-auto flex items-center gap-6')}>
              <p className="inline text-p4 text-primary-700 lg:hidden">Наші соціальні мережі:</p>
              <SocialLinksList list={socialMediaLinksList} className="text-primary-700 hover:text-primary-500" />
            </div>
          </div>
          {showDonationDetails && (
            <div className="w-full bg-secondary-100">
              <DonationSection
                onDonateClick={toggleDonateModal}
                className="mx-auto flex h-[100px] w-fit items-center justify-between gap-2 px-4 py-[6px] lg:hidden"
              />
            </div>
          )}
        </div>
      </nav>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <DonateModal
        isOpen={isDonateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        donationDetails={donationDetails}
      />
    </header>
  );
}

Header.propTypes = {
  socialMediaLinksList: PropTypes.arrayOf(linkItemPropType),
  donationDetails: donationDetailsPropTypes,
};
