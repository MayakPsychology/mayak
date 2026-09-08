'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckBox } from '@/app/_components/CheckBox';
import { PillButton } from '@/app/_components/PillButton';
import ROUTES from '@/app/config/routes';
import { WizardHeader } from './_shared';

const ENTITY_OPTIONS = [
  { value: 'specialist', label: 'Себе, як фахівця у сфері психічного здоровʼя', href: ROUTES.ADD_NEW_SPECIALIST },
  { value: 'event', label: 'Подію', href: ROUTES.ADD_NEW_EVENT },
  { value: 'organization', label: 'Організацію, представником якої я є', href: ROUTES.ADD_NEW_ORGANIZATION },
];

export function ApplicationTypeSelector() {
  const [value, setValue] = useState('');
  const router = useRouter();

  const route = ENTITY_OPTIONS.find(option => option.value === value)?.href;

  return (
    <div className="flex flex-col gap-8">
      <WizardHeader />

      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-p1 font-bold text-primary-900">Хто ми?</h1>
        <p className="text-p3 text-primary-900">
          Платформа &quot;Маяк&quot; від ГО &quot;Маяк – психосоціальна допомога&quot; забезпечує швидкий і зручний
          доступ до перевірених фахівців та організацій, що надають психологічну, соціальну, психотерапевтичну,
          сексологічну та психіатричну підтримку, а також популяризує психологічну просвіту. Ми працюємо з турботою про
          фахівців та користувачів, безкоштовно для надавачів та шукачів 💙
        </p>
        <h2 className="text-p1 font-bold text-primary-900">
          Заповнюючи цю форму, я хочу висвітлити інформацію про...
        </h2>
      </div>

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

      <div className="flex justify-center">
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
