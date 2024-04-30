import Link from "next/link";
import { HeaderCloseIcon, Logo } from '@icons';
import { Drawer } from "@mui/material";
import PropTypes from "prop-types";
import { cn } from "@/utils/cn";
import siteNav from "../config/siteNav";
import { InnerLink, SocialLinksList } from "./Links";
import { DonationSection, donationDetailsPropTypes } from "./DonationSection";
import { FeedbackAction } from "./FeedbackAction";

const flexBetween = 'flex flex-row items-center justify-between';
const basicLink = 'no-underline list-none cursor-pointer';
const listItemText = 'text-p2 font-bold';
const listItemTextHover = 'text-primary-700 hover:text-primary-500';

const { innerLinks } = siteNav;

export default function MobileMenuDrawer ({
  isOpen, 
  onClose, 
  socialMediaLinksList, 
  donationDetails
}) {
  return <Drawer open={isOpen} onClose={onClose} className="lg:hidden" anchor="right" classes={{paper: 'w-full max-w-96'}}>
    <div
      className="flex flex-col h-full bg-other-black transition-all"
    >
      <div className={cn(flexBetween, 'w-full border-b-[1px] border-b-gray-300 bg-primary-100 px-4 py-4')}>
        <Link
          href="/"
          aria-label="Reload main page on logo click"
          className={cn(basicLink, 'transition-all')}
          onClick={onClose}
        >
          <Logo
            alt="Mayak logo"
            aria-label="Mayak logo"
            priority="true"
            className="h-[36px] w-[66px] lg:h-[74px] lg:w-[129px]"
          />
        </Link>
        <button>
          <HeaderCloseIcon onClick={onClose} />
        </button>
      </div>
      <div className="flex grow flex-col overflow-y-auto bg-other-white p-4">
        <div className="flex flex-col items-center">
          <InnerLink
            items={innerLinks}
            onClick={onClose}
            className={cn(
              basicLink,
              listItemTextHover,
              listItemText,
              'w-full border-b-[1px] border-gray-600 px-3 py-1 pb-1 pt-3 text-center transition-all',
            )}
          />
        </div>
        <FeedbackAction className="my-8" />
        <div className={cn('mx-auto flex items-center gap-6')}>
          <p className="inline text-p4 text-primary-700 lg:hidden">Наші соціальні мережі:</p>
          <SocialLinksList list={socialMediaLinksList} className="text-primary-700 hover:text-primary-500" />
        </div>
      </div>
      {donationDetails && (
        <div className="w-full bg-secondary-100">
          <DonationSection
            donationDetails={donationDetails}
            className="mx-auto flex h-[100px] w-fit items-center justify-between gap-2 px-4 py-[6px] lg:hidden"
          />
        </div>
      )}
    </div>
  </Drawer>
}

MobileMenuDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  socialMediaLinksList: PropTypes.array,
  showDonationDetails: PropTypes.bool,
  donationDetails: donationDetailsPropTypes,
};