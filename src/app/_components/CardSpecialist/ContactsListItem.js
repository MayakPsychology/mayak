import PropTypes from 'prop-types';
import Link from 'next/link';
import { cn } from '@utils/cn';
import { ListTruncator } from '@components/ListTruncator';
import { specialistContactPropType } from '@components/CardSpecialist/prop-types';

function ContactItem({ content, href, className }) {
  return (
    <>
      {href ? (
        <Link href={href} target="_blank" rel="noopener noreferrer" className={cn('text-primary-400', className)}>
          {content}
        </Link>
      ) : (
        <p className={cn('text-c3 text-gray-900', className)}>{content}</p>
      )}
    </>
  );
}

ContactItem.propTypes = {
  href: PropTypes.string,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};

function InfoRow({ icon, children }) {
  return (
    <div className="flex items-center">
      <span className="flex w-5 flex-shrink-0 items-start justify-center">{icon}</span>
      <div
        className="ml-2 max-w-full flex-grow overflow-auto break-words
                text-start text-c3 text-gray-700"
      >
        {children}
      </div>
    </div>
  );
}

InfoRow.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node,
};

export function ContactsListItem({ truncate, specialistId, contact }) {
  const { icon, content, href } = contact;
  const isArray = Array.isArray(content);
  const truncateContent = truncate && !isArray;
  return (
    <div className="relative">
      {truncateContent ? (
        <ListTruncator
          id={specialistId}
          content={
            <InfoRow icon={icon}>
              <ContactItem href={href} content={content} className="whitespace-nowrap" />
            </InfoRow>
          }
          hintContent={<ContactItem href={href} content={content} className="whitespace-normal break-words text-c4" />}
          hintWindowClassName="translate-x-full -right-2.5 top-0 z-[200] w-max"
          onHintClick={() => {
            if (href) window.open(href, '_blank');
          }}
        />
      ) : (
        <InfoRow icon={icon}>
          {isArray &&
            content.map(item => (
              <p className="whitespace-normal break-words text-c3" key={item}>
                {item}
              </p>
            ))}
          {!isArray && <ContactItem href={href} content={content} className="whitespace-normal break-words" />}
        </InfoRow>
      )}
    </div>
  );
}

ContactsListItem.propTypes = {
  contact: specialistContactPropType,
  specialistId: PropTypes.string.isRequired,
  truncate: PropTypes.bool,
};
