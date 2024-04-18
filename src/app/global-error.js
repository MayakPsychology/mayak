'use client';

import PropTypes from 'prop-types';
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="w-[800]">
      <h2>Something went wrong!</h2>
      <pre>{JSON.stringify(error, null, 4)}</pre>
    </div>
  );
}

GlobalError.propTypes = {
  error: PropTypes.object,
};
