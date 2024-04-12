import PropTypes from 'prop-types';

export const mapPropTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
      latitude: PropTypes.number.isRequired, // float
      longitude: PropTypes.number.isRequired, // float
    }),
  ).isRequired,
  className: PropTypes.string,
};
