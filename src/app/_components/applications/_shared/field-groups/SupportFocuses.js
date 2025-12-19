'use client';

import PropTypes from 'prop-types';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';

export function SupportFocuses({ therapies }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'supportFocuses',
  });
  const errorMessage = errors.supportFocuses?._errors?.[0] ?? errors.supportFocuses?.message;
  return (
    <div>
      <ul className="flex flex-col gap-6">
        {therapies.map(therapy => {
          const index = fields.findIndex(field => field.therapy === therapy.id);
          const checked = index !== -1;
          return (
            <li key={therapy.id} className="mb-4">
              <div className="flex flex-col gap-4">
                <CheckBox
                  name={`therapy-${therapy.id}`}
                  text={therapy.title}
                  checked={checked}
                  onChange={e => {
                    if (e.target.checked) {
                      append({
                        therapy: therapy.id,
                        price: null,
                        requestsIds: [],
                      });
                    } else {
                      remove(index);
                    }
                  }}
                />
                {checked && (
                  <>
                    <TextInputField
                      {...register(`supportFocuses.${index}.price`)}
                      type="number"
                      placeholder="Ціна"
                      error={errors?.supportFocuses?.[index]?.price}
                    />
                    <ul className="flex flex-wrap">
                      <Controller
                        name={`supportFocuses.${index}.requestsIds`} // index уникален для каждой терапии
                        control={control}
                        render={({ field }) =>
                          therapy.requests.map(request => (
                            <CheckBox
                              key={request.id}
                              name={`supportFocuses.${index}.requestsIds.${request.id}`}
                              value={request.id}
                              text={request.name}
                              checked={field.value.includes(request.id)}
                              onChange={e => {
                                if (e.target.checked) {
                                  field.onChange([...field.value, request.id]);
                                } else {
                                  field.onChange(field.value.filter(id => id !== request.id));
                                }
                              }}
                            />
                          ))
                        }
                      />
                    </ul>
                  </>
                )}
                {errors?.supportFocuses?.[index]?.requestsIds && (
                  <p className="ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4">
                    {errors.supportFocuses[index].requestsIds.message}
                  </p>
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
