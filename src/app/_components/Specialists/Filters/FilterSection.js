import PropTypes from 'prop-types';
import { Heading } from '@components/Typography';
import { cn } from '@/utils/cn';

export default function FilterSection({ className, children, title, titleInfo }) {
  return (
    <div className={cn('border-b border-gray-200 pb-3 md:pb-5', className)}>
      <Heading type="h4" className="mb-4 text-p1 font-bold text-blue-900 md:text-h4">
        {title}
        {titleInfo && <span className="ml-4 text-orange-500">{titleInfo}</span>}
      </Heading>
      {children}
    </div>
  );
}

FilterSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  titleInfo: PropTypes.string,
};
