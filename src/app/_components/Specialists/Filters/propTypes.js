import PropTypes from 'prop-types';

export const requestFilterPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  simpleId: PropTypes.number.isRequired,
  name: PropTypes.string,
});
export const therapyFilterPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  requests: PropTypes.arrayOf(requestFilterPropType),
});
export const districtFilterPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
});
export const cityFilterPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  districts: PropTypes.arrayOf(districtFilterPropType),
});
export const specializationFilterPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
});
export const categoryFilterPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
});
export const filterDataPropTypes = PropTypes.shape({
  therapies: PropTypes.arrayOf(therapyFilterPropType),
  cities: PropTypes.arrayOf(cityFilterPropType),
  categories: PropTypes.arrayOf(categoryFilterPropType),
  specializations: PropTypes.arrayOf(specializationFilterPropType),
});
