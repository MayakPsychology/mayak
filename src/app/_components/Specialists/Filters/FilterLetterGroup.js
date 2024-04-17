import PropTypes from 'prop-types';
import { Heading } from '@components/Typography';

export default function FilterLetterGroup({ letter, children }) {
  return (
    <div>
      <Heading type="h5" className="mb-2 text-[22px] font-bold capitalize leading-5 text-gray-400">
        {letter}
      </Heading>
      {children}
    </div>
  );
}

FilterLetterGroup.propTypes = {
  letter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
