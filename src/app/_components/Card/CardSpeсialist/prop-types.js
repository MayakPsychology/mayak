import P from 'prop-types';

export const specialistPropType = P.shape({
  id: P.string,
  firstName: P.string,
  lastName: P.string,
  surname: P.string,
  specializations: P.array,
  gender: P.string,
  yearsOfExperience: P.number,
  formatOfWork: P.string,
  addresses: P.array,
  therapies: P.array,
  isFreeReception: P.bool,
  description: P.string,
  phone: P.string,
  email: P.string,
  website: P.string,
  isActive: P.bool,
  instagram: P.string,
  facebook: P.string,
  tiktok: P.string,
});

export const specialistContactPropType = P.shape({
  id: P.string,
  icon: P.element,
  content: P.oneOfType([P.string, P.array]),
  href: P.string,
});

export const specialistLabelPropType = P.shape({
  id: P.string,
  icon: P.element,
  content: P.string,
  color: P.string,
});

export const specialistSocialsPropType = P.shape({
  id: P.string,
  icon: P.element,
  href: P.string,
});
