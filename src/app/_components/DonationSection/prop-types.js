import PropTypes from 'prop-types';

export const donationDetailsPropTypes = PropTypes.shape({
  donationEnabled: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleEnabled: PropTypes.string,
  paypalLink: PropTypes.string,
  paypalLinkEnabled: PropTypes.bool,
  privatLink: PropTypes.string,
  privatLinkEnabled: PropTypes.bool,
  bankDetailsEnabled: PropTypes.bool,
  enterpriceName: PropTypes.string,
  iban: PropTypes.string,
  enterpriseRegisterId: PropTypes.string,
  paymentPurpose: PropTypes.string,
  qrEnabled: PropTypes.bool,
  qrLink: PropTypes.string,
});
