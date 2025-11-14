'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckBox } from '@/app/_components/CheckBox';
import { PillButton } from '@/app/_components/PillButton';
import ROUTES from '@/app/config/routes';

export function ApplicationTypeSelector() {
  const [value, setValue] = useState('');
  const router = useRouter();
  const entityOptions = [
    { value: 'organization', label: 'Організацію, представником якої я є', href: ROUTES.APPLY_ORGANIZATION },
    { value: 'specialist', label: 'Себе як спеціаліста', href: ROUTES.APPLY_SPECIALIST },
    { value: 'event', label: 'Подію', href: ROUTES.APPLY_EVENT },
  ];

  const route = entityOptions.find(option => option.value === value)?.href || '#';

  return (
    <div>
      <h1 className="text-center md:text-p3 lg:text-p2">Заповнюючи цю форму, я хочу висвітлити інформацію про...</h1>
      {entityOptions.map(option => (
        <div key={option.value} className="mb-4 flex items-center gap-2">
          <CheckBox
            key={option.value}
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={e => setValue(e.target.value)}
            text={option.label}
          />
        </div>
      ))}
      <div className="flex justify-between">
        <PillButton
          variant="outlined"
          colorVariant="blue"
          aria-label="Click to fill feedback form"
          onClick={() => {
            if (route) router.back();
          }}
        >
          Закрити
        </PillButton>
        <PillButton
          variant="filled"
          colorVariant="blue"
          aria-label="Click to fill feedback form"
          onClick={() => {
            if (route) router.push(route, { scroll: false });
          }}
          disabled={!value}
        >
          Далі
        </PillButton>
      </div>
    </div>
  );
}
