import PropTypes from 'prop-types';

export function FieldHint({ children }) {
  return (
    <ul className="mb-3 ml-4 list-disc text-p4 text-gray-800 marker:text-gray-800">
      <li>{children}</li>
    </ul>
  );
}

FieldHint.propTypes = { children: PropTypes.node.isRequired };
