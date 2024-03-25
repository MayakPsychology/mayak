import PropTypes from 'prop-types';

export const mapPropTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      latitude: PropTypes.number.isRequired, // float
      longitude: PropTypes.number.isRequired, // float
    }),
  ).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};
