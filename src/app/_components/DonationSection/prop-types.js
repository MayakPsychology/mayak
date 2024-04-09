import PropTypes from 'prop-types';

export const donationDetailsPropTypes = PropTypes.shape({
  isDonationEnabled: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isSubtitleEnabled: PropTypes.string,
  paypalLink: PropTypes.string,
  isPayPalLinkEnabled: PropTypes.bool,
  privatLink: PropTypes.string,
  isPrivatLinkEnabled: PropTypes.bool,
  isBankDetailsEnabled: PropTypes.bool,
  enterpriceName: PropTypes.string,
  iban: PropTypes.string,
  enterpriseRegisterId: PropTypes.number,
  paymentPurpose: PropTypes.string,
  isQREnabled: PropTypes.bool,
  qrLink: PropTypes.string,
});
