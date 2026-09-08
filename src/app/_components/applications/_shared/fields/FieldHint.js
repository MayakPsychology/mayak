import PropTypes from 'prop-types';

export function FieldHint({ children }) {
  return (
    <ul className="mb-3 ml-4 list-disc text-p4 text-gray-800 marker:text-gray-800">
      <li>{children}</li>
    </ul>
  );
}

FieldHint.propTypes = { children: PropTypes.node.isRequired };

// The mocks bullet several lines of guidance under one question, so hints come as a list.
export function FieldHints({ hints }) {
  if (!hints?.length) return null;

  return (
    <ul className="mb-3 ml-4 list-disc text-p4 text-gray-800 marker:text-gray-800">
      {hints.map(hint => (
        <li key={typeof hint === 'string' ? hint : hint.key}>{typeof hint === 'string' ? hint : hint.text}</li>
      ))}
    </ul>
  );
}

FieldHints.propTypes = {
  hints: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ key: PropTypes.string, text: PropTypes.node })]),
  ),
};
