import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PillButton } from '@components/PillButton';
import { CheckBox } from '@components/CheckBox';
import FilterSection from '@components/Specialists/Filters/FilterSection';
import ScrollableList from '@components/Specialists/Filters/ScrollableList';
import FilterLetterGroup from '@/app/_components/Specialists/Filters/FilterLetterGroup';
import useToggleState from '@/app/_hooks/useToggleState';
import { requestFilterPropType } from './propTypes';
import { groupByLetters, specialistFiltersConfig } from './utils';

export default function FilterRequestsSection({ className, requests, filters, appendFilter }) {
  const [isExpanded, { open, toggle }] = useToggleState(false);
  const value = filters.getAll(specialistFiltersConfig.request.filterKey);
  const groupedRequests = useMemo(() => groupByLetters(requests), [requests]);
  const groupedShortedRequests = useMemo(() => groupByLetters(requests.slice(0, 3)), [requests]);
  const availableLetters = useMemo(
    () => Object.keys(groupedRequests).sort((a, b) => a.localeCompare(b)),
    [groupedRequests],
  );
  const shortedLetters = useMemo(
    () => Object.keys(groupedShortedRequests).sort((a, b) => a.localeCompare(b)),
    [groupedShortedRequests],
  );
  const lettersToRender = isExpanded ? availableLetters : shortedLetters;
  const requestsToRender = isExpanded ? groupedRequests : groupedShortedRequests;

  const handleLetterClick = (letter, onClick) => {
    if (!isExpanded) {
      open();
    }
    setTimeout(() => onClick(letter));
  };
  return (
    <FilterSection title={specialistFiltersConfig.request.title} className={className}>
      <div className="mb-4 grid grid-cols-9 gap-2.5 font-medium md:flex">
        {availableLetters.map(letter => (
          <ScrollableList.ScrollTo key={letter} name={letter}>
            {({ onClick }) => (
              <button
                key={letter}
                className="text-center capitalize md:flex-1 md:text-left"
                data-letter={letter}
                onClick={() => handleLetterClick(letter, onClick)}
              >
                {letter}
              </button>
            )}
          </ScrollableList.ScrollTo>
        ))}
      </div>
      <div className="flex flex-col gap-4 md:gap-3">
        {lettersToRender.map(letter => (
          <ScrollableList.Section key={letter} name={letter}>
            <FilterLetterGroup letter={letter}>
              <ul>
                {requestsToRender[letter].map(request => (
                  <li key={request.id} className="mb-1 last:mb-0 md:mb-2">
                    <CheckBox
                      name="request"
                      value={String(request.simpleId)}
                      checked={value.includes(String(request.simpleId))}
                      onChange={() => appendFilter(specialistFiltersConfig.request.filterKey, String(request.simpleId))}
                      text={request.name}
                      classNames={{ labelText: 'text-p3' }}
                    />
                  </li>
                ))}
              </ul>
            </FilterLetterGroup>
          </ScrollableList.Section>
        ))}
      </div>
      <div className="text-right">
        <PillButton variant="text" colorVariant="blue" onClick={toggle}>
          {isExpanded ? 'Приховати' : 'Дивитися всі'}
        </PillButton>
      </div>
    </FilterSection>
  );
}
FilterRequestsSection.propTypes = {
  className: PropTypes.string,
  requests: PropTypes.arrayOf(requestFilterPropType).isRequired,
  filters: PropTypes.object.isRequired,
  appendFilter: PropTypes.func.isRequired,
};
