import PropTypes from 'prop-types';
import { QRCodeSVG } from 'qrcode.react';
import Instagram from '@icons/instagram.svg';
import Facebook from '@icons/facebook.svg';
import { Modal } from '@components/Modal';
import { PillButton } from '@components/PillButton';
import { Heading, Paragraph } from '@components/Typography';
import { useMediaQuery } from '@hooks';
import { screens } from '@/app/styles/tailwind/ui';

const icons = [
  { match: 'instagram', icon: <Instagram /> },
  { match: 'facebook', icon: <Facebook /> },
];

function MobileModal({ link }) {
  const icon = icons.find(({ match }) => link?.includes(match))?.icon;

  return (
    <a className="lg:hidden" href={link} target="_blank" rel="noopener noreferrer">
      <PillButton
        variant="filled"
        colorVariant="blue"
        className="flex w-full text-center font-bold text-other-white"
        aria-label="Перейти за лінком"
      >
        {icon ? (
          <span className="flex gap-4">
            <span>Відкрити в</span>
            {icon}
          </span>
        ) : (
          <span>Перейти за лінком</span>
        )}
      </PillButton>
    </a>
  );
}

export function EventLinkModal({ isOpen, onClose, link }) {
  const isDesktop = useMediaQuery(`(min-width: ${screens.lg})`);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-64 opacity-100 lg:w-fit lg:bg-primary-200"
      isCloseButton={isDesktop}
      layout={isDesktop}
      scrollY
    >
      <div className="hidden flex-col items-center gap-6 px-[72px] pb-12 pt-3 lg:flex lg:w-[744px]">
        <Heading type="h3" className="text-center font-bold">
          Скануй посилання, щоб переглянути подію
        </Heading>
        <a className="block w-fit" href={link} target="_blank" rel="noopener noreferrer">
          <QRCodeSVG size={204} value={link} />
        </a>
        <div className="flex w-full flex-col items-center gap-3">
          <Paragraph type="p2" className="text-center">
            або
          </Paragraph>
          <a className="block w-full" href={link} target="_blank" rel="noopener noreferrer">
            <PillButton
              variant="filled"
              colorVariant="blue"
              className="w-full text-center text-other-white"
              aria-label="Перейти за лінком"
            >
              Перейти за лінком
            </PillButton>
          </a>
        </div>
      </div>
      <MobileModal link={link} />
    </Modal>
  );
}

MobileModal.propTypes = {
  link: PropTypes.string,
};

EventLinkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string,
};
