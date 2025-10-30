import React from 'react';
import { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Hint } from '@components/Hint';
import { getLinksList } from '@components/Links/linksActions';
import { prisma } from '@/lib/db';

export const metadata = {
  title: {
    template: '%s | Маяк',
    default: 'Маяк',
  },
};

export default async function Layout({ children, modal }) {
  const donationDetails = await prisma.donationDetails.findFirst();
  const socialLinks = await getLinksList();

  return (
    <Hint>
      <div className="flex min-h-screen flex-col">
        <Header socialMediaLinksList={socialLinks.socialMediaLinksList} donationDetails={donationDetails} />
        <main className="relative flex-1">{children}</main>
        <Footer socialLinks={socialLinks} />
      </div>
      {modal}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3 * 1000,
          },
          error: {
            duration: 5 * 1000,
          },
          className: 'bg-other-white text-p4 max-w[500px] py-[16px] px-[24px] text-gray-700',
        }}
      />
    </Hint>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  modal: PropTypes.node,
};
