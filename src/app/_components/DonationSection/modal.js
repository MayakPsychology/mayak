import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '@components/Modal';
import { Paragraph } from '@components/Typography';
import PropTypes from 'prop-types';
import { QRCodeSVG } from 'qrcode.react';
import { Group, PayPal, Privat24 } from '@icons';
import { cn } from '@/utils/cn';

function DataSection({ label, text }) {
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
    });
  }, [text]);

  return (
    <div className="flex w-full flex-col items-start gap-[6px]">
      <div className="flex items-start gap-[6px] self-stretch">
        <Paragraph className="text-p4 font-bold uppercase text-other-black">{label}</Paragraph>
      </div>
      <div className="wrap-1 flex content-center items-center gap-[6px]">
        <Paragraph className="text-p4 text-gray-900">{text}</Paragraph>
        <div className="relative cursor-pointer px-[5px] py-1" id={label} onClick={copyToClipboard}>
          <Group />
        </div>
      </div>
    </div>
  );
}

DataSection.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
};

function PillLink({ href, children, className }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-[48px] w-full flex-1 cursor-pointer items-center justify-center gap-5 rounded-[100px] border-[1px] border-primary-500 bg-other-white px-[1px] py-0"
    >
      <div className={cn('flex items-center', className)}>{children}</div>
    </a>
  );
}

PillLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export function DonateModal({ isOpen, onClose, privatLink, paypalLink, qrLink }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-[570px] w-[100vw] flex-shrink-0 bg-primary-200 px-4 md:max-w-[340px] lg:max-h-[663px] lg:max-w-[744px] lg:pb-[57px]"
    >
      <div className="flex flex-col gap-9 p-1 md:p-0 lg:px-9 lg:pb-2">
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center">
            <Paragraph type="p1" className="text-inherit text-center text-p1 font-bold lg:text-h3">
              Підтримати проект
            </Paragraph>
          </div>
          <Paragraph
            type="p4"
            className="w-full whitespace-nowrap text-center text-p4 font-normal text-gray-900 lg:text-p2"
          >
            Ваш донат допоможе...
          </Paragraph>
        </div>
        <div className="flex w-full flex-col gap-[10px] lg:gap-5">
          <div className="inline-flex w-full items-start justify-between gap-[10px]">
            <PillLink href={privatLink} className="h-[24px] w-[73px] lg:h-[30px] lg:w-[117px]">
              <Privat24 />
            </PillLink>
            <PillLink href={paypalLink} className="h-[24px] w-[73px] lg:h-[23px] lg:w-[90px]">
              <PayPal />
            </PillLink>
          </div>

          <div className="flex gap-5">
            <div className="flex w-full flex-col items-center gap-5 rounded-[30px] bg-other-white px-3 py-6 lg:py-5 lg:pe-10 lg:ps-5">
              <div className="flex w-full items-center justify-between gap-9 lg:gap-14">
                <div className="flex flex-col gap-5 p-1">
                  <DataSection label="Назва підприємства" text={'Соціальний проект "Маяк"'} />
                  <DataSection label="IBAN" text="UA123456789012345678901234567" />
                  <DataSection label="Єдрпоу" text="12345678" />
                  <DataSection label="Призначення платежу:" text="Благодійний внесок" />
                </div>
                <a className="hidden w-fit lg:block" href={qrLink} target="_blank" rel="noopener noreferrer">
                  <QRCodeSVG size={200} value={qrLink} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

DonateModal.propTypes = {
  privatLink: PropTypes.string,
  paypalLink: PropTypes.string,
  qrLink: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
