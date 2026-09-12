'use client';

import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { SelectField, TextInputField } from '@/app/_components/InputFields';
import { OWNERSHIP_OPTIONS } from '@/app/config/application/choices';
import { FieldHeading, FieldHint, TextAreaField } from '../../_shared/fields';

const errorClass = 'ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4';

const YEARS_ON_MARKET_OPTIONS = Array.from({ length: 60 }, (unused, i) => ({ value: i + 1, name: String(i + 1) }));

const EXPERIENCE_HINTS = [
  {
    key: 'focus',
    text: (
      <>
        <strong>Опишіть головний фокус роботи:</strong> у вирішенні яких запитів ваша команда є найбільш досвідченою?
      </>
    ),
  },
  {
    key: 'scale',
    text: (
      <>
        <strong>Масштаб діяльності:</strong> за бажанням вкажіть скільком людям/сімʼям Ви вже допомогли або як довго
        працюєте у цій сфері?
      </>
    ),
  },
  {
    key: 'unions',
    text: 'За наявності, вкажіть приналежність до фахових спілок, асоціацій чи мереж, що підтверджують вашу етичність та якість послуг.',
  },
];

export function OrganizationGeneralInfo({ organizationTypes }) {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div>
        <FieldHeading>Загальна інформація</FieldHeading>
        <TextInputField
          {...register('name')}
          placeholder="Назва організації"
          error={errors?.name?.message}
          additionalContainerStyle="bg-other-white"
        />
      </div>

      <fieldset>
        <FieldHeading as="legend">Який із зазначених типів організацій найближчий до Вашої?</FieldHeading>
        <Controller
          name="type"
          control={control}
          render={({ field }) => {
            const [selected] = field.value ?? [];
            return (
              <div>
                {organizationTypes.map(type => (
                  <CheckBox
                    key={type.id}
                    name="type"
                    type="radio"
                    value={type.id}
                    text={type.name.toLocaleLowerCase('uk')}
                    checked={selected === type.id}
                    onBlur={field.onBlur}
                    onChange={() => {
                      // the schema keeps a list, but the mocks only allow the closest single match
                      field.onChange([type.id]);
                      setValue('typeNames', [type.name]);
                    }}
                  />
                ))}
              </div>
            );
          }}
        />
        {errors.type && <p className={errorClass}>{errors.type.message}</p>}
      </fieldset>

      <fieldset>
        <FieldHeading as="legend">Яка Ви структура за формою власності?</FieldHeading>
        <Controller
          name="ownershipType"
          control={control}
          render={({ field }) => (
            <div>
              {OWNERSHIP_OPTIONS.map(choice => (
                <CheckBox
                  key={choice.value}
                  name="ownershipType"
                  type="radio"
                  value={choice.value}
                  text={choice.label}
                  checked={field.value === choice.value}
                  onBlur={field.onBlur}
                  onChange={() => field.onChange(choice.value)}
                />
              ))}
            </div>
          )}
        />
        {errors.ownershipType && <p className={errorClass}>{errors.ownershipType.message}</p>}
      </fieldset>

      <div>
        <FieldHeading>Вкажіть місяць та рік початку роботи організації</FieldHeading>
        <FieldHint>Ми вкажемо &quot;стаж&quot; на ринку у роках.</FieldHint>
        <Controller
          name="yearsOnMarket"
          control={control}
          render={({ field }) => (
            <SelectField
              name="yearsOnMarket"
              value={field.value ?? ''}
              onChange={event => field.onChange(event.target.value)}
              placeholder="Роки стажу"
              options={YEARS_ON_MARKET_OPTIONS}
              error={errors?.yearsOnMarket?.message}
              additionalContainerStyle="bg-other-white"
            />
          )}
        />
      </div>

      <TextAreaField
        name="experience"
        label="Ваш досвід та спеціалізація"
        hints={EXPERIENCE_HINTS}
        placeholder="Досвід організації"
        maxLength={5000}
      />
    </>
  );
}

OrganizationGeneralInfo.propTypes = {
  organizationTypes: PropTypes.array.isRequired,
};
