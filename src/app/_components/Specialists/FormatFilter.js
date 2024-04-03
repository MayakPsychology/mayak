'use client';

import { useEffect, useState } from 'react';
import { CheckBox } from '@components/CheckBox';
import { ClearFilterButton, FilterBase } from '@components/Specialists';
import { useSetParam } from '@hooks';
import { useSearchParams } from 'next/navigation';

const offline = 'OFFLINE';
const online = 'ONLINE';

function FormatList() {
  const [selectedFormat, setSelectedFormat] = useState();

  const searchParams = useSearchParams();
  const { remove, replace } = useSetParam('format');

  const onChange = format => {
    replace(format);
  };

  useEffect(() => {
    const formatInUrl = searchParams.get('format');
    setSelectedFormat(formatInUrl);
  }, [searchParams]);

  return (
    <>
      <ul>
        <li className="w-[280px] md:w-[300px]">
          <CheckBox
            name={online}
            value={online}
            type="radio"
            checked={selectedFormat === online}
            onChange={() => onChange(online)}
            text="Онлайн"
          />
        </li>
        <li className="w-[280px] md:w-[300px]">
          <CheckBox
            name={offline}
            value={offline}
            checked={selectedFormat === offline}
            type="radio"
            onChange={() => onChange(offline)}
            text="Офлайн"
          />
        </li>
      </ul>
      <ClearFilterButton
        clear={() => {
          remove();
        }}
      />
    </>
  );
}

export function FormatFilter() {
  const formatInUrl = useSearchParams().get('format');

  return (
    <FilterBase filterText="Формат роботи" count={Number(!!formatInUrl)}>
      <FormatList />
    </FilterBase>
  );
}
