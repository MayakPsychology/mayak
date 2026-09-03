'use client';

import PropTypes from 'prop-types';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CheckBox } from '@/app/_components/CheckBox';
import { TextInputField } from '@/app/_components/InputFields';
import { getArrayError } from '../getArrayError';

export function SupportFocuses({ therapies }) {
  const {
    control,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'supportFocuses',
  });
  const errorMessage = getArrayError(errors, 'supportFocuses');
  return (
    <div>
      <ul className="flex flex-col gap-6">
        {therapies.map(therapy => {
          const index = fields.findIndex(field => field.therapy?.id === therapy.id);
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
                        therapy: {
                          id: therapy.id,
                          title: therapy.title,
                        },
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
                        name={`supportFocuses.${index}.requestsIds`} // для БД
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => {
                          const ids = field.value;
                          const titles = getValues(`supportFocuses.${index}.requestsNames`) || [];

                          return therapy.requests.map(request => {
                            const isChecked = ids.includes(request.id);

                            return (
                              <li key={request.id}>
                                <CheckBox
                                  name={`supportFocuses.${index}.requestsIds.${request.id}`}
                                  value={request.id}
                                  text={request.name}
                                  checked={isChecked}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      field.onChange([...ids, request.id]);
                                      setValue(`supportFocuses.${index}.requestsNames`, [...titles, request.name]);
                                    } else {
                                      field.onChange(ids.filter(id => id !== request.id));
                                      setValue(
                                        `supportFocuses.${index}.requestsNames`,
                                        titles.filter(t => t !== request.name),
                                      );
                                    }
                                  }}
                                />
                              </li>
                            );
                          });
                        }}
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
