'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckBox } from '@/app/_components/CheckBox';
import { PillButton } from '@/app/_components/PillButton';
import ROUTES from '@/app/config/routes';

const ENTITY_OPTIONS = [
  { value: 'organization', label: 'Організацію, представником якої я є', href: ROUTES.ADD_NEW_ORGANIZATION },
  { value: 'specialist', label: 'Себе як спеціаліста', href: ROUTES.ADD_NEW_SPECIALIST },
  { value: 'event', label: 'Подію', href: ROUTES.ADD_NEW_EVENT },
];

export function ApplicationTypeSelector() {
  const [value, setValue] = useState('');
  const router = useRouter();

  const route = ENTITY_OPTIONS.find(option => option.value === value)?.href;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-center text-p3 font-bold text-primary-700 lg:text-p2">
        Заповнюючи цю форму, я хочу висвітлити інформацію про...
      </h1>

      <div className="flex flex-col gap-4">
        {ENTITY_OPTIONS.map(option => (
          <CheckBox
            key={option.value}
            name="applicationType"
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={event => setValue(event.target.value)}
            text={option.label}
          />
        ))}
      </div>

      <div className="flex justify-between gap-4">
        <PillButton
          variant="outlined"
          colorVariant="blue"
          aria-label="Закрити форму заявки"
          onClick={() => router.back()}
        >
          Закрити
        </PillButton>
        <PillButton
          variant="filled"
          colorVariant="blue"
          aria-label="Перейти до форми заявки"
          onClick={() => route && router.push(route, { scroll: false })}
          disabled={!route}
        >
          Далі
        </PillButton>
      </div>
    </div>
  );
}
