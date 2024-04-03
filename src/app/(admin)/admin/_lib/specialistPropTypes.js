import PropTypes from 'prop-types';
import { FormatOfWork } from '@prisma/client';

const relatedInstanceCore = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  createdAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};

export const districtPropType = PropTypes.shape(relatedInstanceCore);

export const therapyPropType = PropTypes.shape({
  ...relatedInstanceCore,
  type: PropTypes.string,
  title: PropTypes.string,
  priority: PropTypes.number,
  imagePath: PropTypes.string,
  description: PropTypes.string,
  isActive: PropTypes.bool,
  createdAt: PropTypes.instanceOf(Date),
});

export const requestPropType = PropTypes.shape({
  ...relatedInstanceCore,
  therapies: PropTypes.arrayOf(therapyPropType),
});

export const therapiesCutPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  therapy: therapyPropType,
  requests: PropTypes.arrayOf(requestPropType),
  createdAt: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
});

export const specializationPropType = PropTypes.shape(relatedInstanceCore);

export const addressPropType = PropTypes.shape({
  id: PropTypes.string,
  nameOfClinic: PropTypes.string,
  fullAddress: PropTypes.string,
  district: districtPropType,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  createdAt: PropTypes.instanceOf(Date),
});

export const specialistPropType = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  surname: PropTypes.string,
  specializations: PropTypes.array,
  gender: PropTypes.string,
  yearsOfExperience: PropTypes.number,
  formatOfWork: PropTypes.oneOf(Object.values(FormatOfWork)),
  addresses: PropTypes.arrayOf(addressPropType),
  therapies: PropTypes.arrayOf(therapyPropType),
  isFreeReception: PropTypes.bool,
  description: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  isActive: PropTypes.bool,
  instagram: PropTypes.string,
  facebook: PropTypes.string,
  youtube: PropTypes.string,
  linkedin: PropTypes.string,
  tiktok: PropTypes.string,
  viber: PropTypes.string,
  telegram: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
});

export const organizationPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.arrayOf(PropTypes.shape(relatedInstanceCore)),
  yearsOnMarket: PropTypes.number,
  formatOfWork: PropTypes.oneOf(Object.values(FormatOfWork)),
  addresses: PropTypes.arrayOf(addressPropType),
  therapies: PropTypes.arrayOf(therapyPropType),
  isFreeReception: PropTypes.bool,
  description: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  isActive: PropTypes.bool,
  instagram: PropTypes.string,
  facebook: PropTypes.string,
  tiktok: PropTypes.string,
  youtube: PropTypes.string,
  linkedin: PropTypes.string,
  viber: PropTypes.string,
  telegram: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
});

export const specialistContactPropType = PropTypes.shape({
  id: PropTypes.string,
  icon: PropTypes.element,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  href: PropTypes.string,
});

export const specialistLabelPropType = PropTypes.shape({
  id: PropTypes.string,
  icon: PropTypes.element,
  content: PropTypes.string,
  color: PropTypes.string,
});

export const specialistSocialsPropType = PropTypes.shape({
  id: PropTypes.string,
  icon: PropTypes.element,
  href: PropTypes.string,
});
