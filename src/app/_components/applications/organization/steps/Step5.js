'use client';

import { NO_OR_OTHER_OPTIONS } from '@/app/config/application/choices';
import { StepHeader } from '../../_shared';
import { RadioGroupField, TextAreaField } from '../../_shared/fields';

const INTRO = (
  <>
    <p>
      У цьому підрозділі ми уточнюємо інформацію про засади роботи Вашої організації з метою розуміння, чи організація
      підходить нам, а ми - їй.
    </p>
    <p>
      Якщо у Вашій організації <strong>ще не формалізовані певні політики чи процедури</strong> (наприклад, супервізійна
      політика, етичний кодекс, система збору зворотного звʼязку), але Ви на практиці{' '}
      <strong>дотримуєтесь відповідних принципів</strong> - це <strong>не є мінусом</strong>.
    </p>
    <p>
      Ми цінуємо <strong>відкритість до розвитку та вдосконалення</strong>, і наша мета - підтримати професійні
      спільноти, які прагнуть надавати якісну та етичну допомогу.
    </p>
  </>
);

const NOTE = (
  <>
    Звертаємо увагу, що вказана Вами інформація у цьому підрозділі після обробки адміністраторами <strong>НЕ</strong>{' '}
    буде висвітлена на сайті або буде виставлена виключно за погодженням сторін.
  </>
);

export function Step5() {
  return (
    <fieldset className="flex w-full flex-col gap-10">
      <StepHeader title="Крок 5: Відповідність організації баченню платформи" intro={INTRO} note={NOTE} />

      <TextAreaField
        name="specialistSelection"
        label="Опишіть, яким чином відбувається відбір спеціалістів до організації?"
        hints={[
          <>
            Ви можете <strong>тезово</strong> описати головні критерії, які враховуються при підборі спеціалістів.
          </>,
          <>
            Особливу увагу ми звертатимемо на освіту спеціалістів, тому вкажіть <strong>реальну</strong> мінімально
            необхідну освіту спеціалістів Вашої організації.
          </>,
        ].map((text, index) => ({ key: `selection-${index}`, text }))}
        placeholder="Відбір спеціалістів"
      />

      <TextAreaField
        name="averageExperience"
        label="Який середній досвід роботи спеціалістів в роках?"
        placeholder="Середній досвід"
        maxLength={500}
      />

      <TextAreaField
        name="achievements"
        label="Опишіть досягнення Вашої організації"
        hints={[
          'До прикладу, якщо Ваша організація входить до визнаної української або міжнародної асоціації або організація отримала подяку за роботу, або спеціалісти Вашої організації пройшли підвищення кваліфікації тощо.',
        ]}
        placeholder="Досягнення"
      />

      <TextAreaField
        name="workMethods"
        label="Які методи роботи використовують спеціалісти Вашої організації?"
        placeholder="Методи"
      />

      <RadioGroupField
        name="developmentPolicy"
        label="Чи розроблено політику професійного розвитку спеціалістів (навчання, курси, тренінги)?"
        hints={[
          { key: 'development', text: <>Якщо так - <strong>коротко</strong> опишіть її в опції &quot;Інше&quot;.</> },
        ]}
        options={NO_OR_OTHER_OPTIONS}
        otherField="developmentPolicyOther"
      />

      <RadioGroupField
        name="supervisionPolicy"
        label="Чи проходять спеціалісти регулярні супервізії та інтервізії?"
        hints={[
          {
            key: 'supervision',
            text: (
              <>
                Якщо так - <strong>коротко</strong> опишіть вимоги до регулярності проходження та місце проходження
                супервізії та/або інтервізії.
              </>
            ),
          },
        ]}
        options={NO_OR_OTHER_OPTIONS}
        otherField="supervisionPolicyOther"
      />

      <TextAreaField
        name="ethicalControl"
        label="Як забезпечується етичний контроль (власний кодекс, дотримання міжнародного кодексу), в тому числі в контексті виникнення конфліктних ситуацій?"
        placeholder="Етичний контроль"
      />

      <TextAreaField
        name="feedbackCollection"
        label="Яким чином відбувається збір зворотнього звʼязку (інформації від клієнтів про якість наданих послуг)?"
        placeholder="Зворотній звʼязок"
      />
    </fieldset>
  );
}
