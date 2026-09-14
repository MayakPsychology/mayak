'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { cn } from '@utils/cn';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';
import { FieldHeading } from '../fields';
import { getArrayError } from '../getArrayError';

const COLLAPSED_REQUESTS = 24;

function RequestPill({ id, name, isChecked, onToggle }) {
  return (
    <li>
      <label
        htmlFor={id}
        className={cn(
          'inline-flex cursor-pointer items-center gap-1 rounded-full border px-3 py-1 text-p4',
          isChecked
            ? 'border-primary-500 bg-primary-300 font-medium text-primary-900'
            : 'border-gray-600 text-primary-900',
        )}
      >
        <input id={id} type="checkbox" className="sr-only" checked={isChecked} onChange={onToggle} />
        {isChecked && <span aria-hidden="true">✓</span>}
        {name}
      </label>
    </li>
  );
}

RequestPill.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

function TherapyRequests({ therapy, index }) {
  const { control, getValues, setValue } = useFormContext();
  const [isExpanded, setExpanded] = useState(false);
  const hasMore = therapy.requests.length > COLLAPSED_REQUESTS;

  return (
    <Controller
      name={`supportFocuses.${index}.requestsIds`}
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        const ids = field.value ?? [];
        const shown = isExpanded ? therapy.requests : therapy.requests.slice(0, COLLAPSED_REQUESTS);

        return (
          <div>
            <FieldHeading isRequired={false}>Запити, з якими працюю</FieldHeading>
            <ul className="flex flex-wrap gap-2">
              {shown.map(request => (
                <RequestPill
                  key={request.id}
                  id={`supportFocuses-${index}-${request.id}`}
                  name={request.name}
                  isChecked={ids.includes(request.id)}
                  onToggle={event => {
                    const titles = getValues(`supportFocuses.${index}.requestsNames`) || [];
                    if (event.target.checked) {
                      field.onChange([...ids, request.id]);
                      setValue(`supportFocuses.${index}.requestsNames`, [...titles, request.name]);
                    } else {
                      field.onChange(ids.filter(id => id !== request.id));
                      setValue(
                        `supportFocuses.${index}.requestsNames`,
                        titles.filter(title => title !== request.name),
                      );
                    }
                  }}
                />
              ))}
            </ul>
            {hasMore && (
              <button
                type="button"
                onClick={() => setExpanded(expanded => !expanded)}
                className="mt-2 block w-full text-center text-p4 font-semibold text-primary-500 underline"
              >
                {isExpanded ? 'менше' : 'більше'}
              </button>
            )}
          </div>
        );
      }}
    />
  );
}

TherapyRequests.propTypes = {
  therapy: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export function SupportFocuses({ therapies }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({ name: 'supportFocuses' });
  const errorMessage = getArrayError(errors, 'supportFocuses');

  return (
    <div>
      <ul className="flex flex-col gap-8">
        {therapies.map(therapy => {
          const index = fields.findIndex(field => field.therapy?.id === therapy.id);
          const checked = index !== -1;

          return (
            <li key={therapy.id}>
              <div className="flex flex-col gap-4">
                <CheckBox
                  name={`therapy-${therapy.id}`}
                  text={therapy.title.toLocaleLowerCase('uk')}
                  checked={checked}
                  onChange={e => {
                    if (e.target.checked) {
                      append({
                        therapy: { id: therapy.id, title: therapy.title },
                        price: null,
                        requestsIds: [],
                        requestsNames: [],
                      });
                    } else {
                      remove(index);
                    }
                  }}
                />
                {checked && (
                  <>
                    <div>
                      <FieldHeading isRequired={false}>Ціна</FieldHeading>
                      <TextInputField
                        {...register(`supportFocuses.${index}.price`)}
                        type="number"
                        min={0}
                        placeholder="Х грн/год"
                        additionalContainerStyle="bg-other-white"
                        error={errors?.supportFocuses?.[index]?.price?.message}
                      />
                    </div>
                    <TherapyRequests therapy={therapy} index={index} />
                    {errors?.supportFocuses?.[index]?.requestsIds && (
                      <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
                        {errors.supportFocuses[index].requestsIds.message}
                      </p>
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {errorMessage && (
        <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">{errorMessage}</p>
      )}
    </div>
  );
}

SupportFocuses.propTypes = {
  therapies: PropTypes.array.isRequired,
};
