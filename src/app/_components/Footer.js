import Link from 'next/link';
import { WhiteLogo } from '@icons';
import { cn } from '@utils/cn';
import { PillButton } from '@components/PillButton';
import PropTypes from 'prop-types';
import { linkItemPropType, SocialLinksList } from '@components/Links';

const flexBetweenMd = 'lg:inline-flex lg:flex-row lg:items-center lg:justify-between';
const flexCenter = 'inline-flex flex-row items-center justify-center';
const flexCenterMd = 'lg:inline-flex lg:flex-row lg:items-center lg:justify-center';
const flexColCenter = 'flex flex-col items-center';
const flexColRevCenter = 'flex flex-col-reverse items-center';
const basicLink = 'no-underline list-none cursor-pointer';
const iconColors = 'text-other-white hover:text-primary-400';

export function Footer({ socialLinks }) {
  const { applicationLink, socialMediaLinksList } = socialLinks;

  return (
    <footer className="relative flex w-full flex-col overflow-hidden bg-primary-800 p-4 text-white lg:px-20 lg:py-12">
      <div className={cn(flexColCenter, flexBetweenMd, 'gap-4')}>
        <Link href="/" aria-label="Reload main page on logo click" className={cn(basicLink, 'transition-all')}>
          <WhiteLogo
            alt="Footer logo image"
            aria-label="Footer logo image"
            priority="true"
            className="flex-no-shrink h-[36px] w-[66px] fill-current lg:h-[74px] lg:w-[129px]"
          />
        </Link>
        <div className={cn(flexColCenter, flexCenterMd, 'gap-2 py-3 text-other-white lg:gap-6')}>
          <p className="text-p4 font-bold text-other-white lg:text-p1">Ставай нашим партнером</p>
          <Link
            href={applicationLink?.href ?? '#'}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Send your application as a specialist to join the community"
          >
            <PillButton variant="outlined" colorVariant="white" aria-label="Click to fill application form">
              Залишити заявку
            </PillButton>
          </Link>
        </div>
      </div>
      <div className="relative left-[-10%] my-3 h-[1px] w-[120%] bg-gray-300 lg:static lg:my-12 lg:w-full" />
      <div className={cn(flexColRevCenter, flexBetweenMd, 'gap-4 text-other-white')}>
        <p className="text-[0.75rem] font-normal leading-5 lg:text-p4">Маяк @ 2024</p>
        <div className={cn(flexCenter, 'gap-5 lg:gap-4')}>
          <p className="hidden text-p2 font-medium text-other-white lg:inline">Слідкуй за нами в соцмережах</p>
          <p className="inline text-p4 text-other-white lg:hidden">Наші соціальні мережі:</p>
          <SocialLinksList
            role="list"
            status="footerSocials"
            className={cn(basicLink, iconColors, 'hover:color-primary-500 gap-4 transition-all hover:text-primary-500')}
            list={socialMediaLinksList}
          />
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  socialLinks: PropTypes.shape({
    socialMediaLinksList: PropTypes.arrayOf(linkItemPropType),
    applicationLink: linkItemPropType,
  }),
};
