import React from 'react';
import P from 'prop-types';
import montserrat from '@/app/styles/font';
import { cn } from '@/utils/cn';
import { QueryContext } from './queryContext';
import './globals.css';

export const metadata = {
  // metadataBase: new URL('http://localhost:3000'),

  title: {
    template: '%s | Маяк',
    default: 'Маяк',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body className={cn(montserrat.className, 'relative scroll-smooth')}>
        <QueryContext>
          <main className="bg-other-white">{children}</main>
        </QueryContext>
        <div id="modal-root" />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: P.node.isRequired,
};
