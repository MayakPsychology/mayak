'use-client';

import PropTypes from 'prop-types';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { IoMdCloseCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { SelectField } from '../../InputFields/SelectField';
import { CheckBox } from '../../CheckBox';
import { TextInputField } from '../../InputFields';

export function Step4({ therapies, requests }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'supportFocuses',
  });

  return (
    <fieldset>
      <legend>Цінова політика та типи допомоги</legend>
      <Controller
        name="isFreeReception"
        control={control}
        render={({ field }) => (
          <CheckBox
            checked={field.value ?? false}
            onChange={field.onChange}
            ref={field.ref}
            text="Безкоштовний прийом"
          />
        )}
      />
      <fieldset>
        <legend className="mb-6">Який тип допомоги можна отримати у Вас? *</legend>
        <ul className="flex flex-col gap-6">
          {fields.map((field, index) => (
            <li key={field.id} className="mb-4">
              <div className="flex flex-col gap-4">
                <SelectField
                  {...register(`supportFocuses.${index}.therapyId`)}
                  placeholder="Терапія"
                  options={therapies}
                />

                <TextInputField
                  {...register(`supportFocuses.${index}.price`)}
                  type="number"
                  lable="Ціна"
                  placeholder="Ціна"
                />
                <ul>
                  <li>
                    <Controller
                      name={`supportFocuses.${index}.requestsIds`}
                      control={control}
                      render={({ field: ctrlField }) => {
                        const selected = ctrlField.value || [];
                        const error = errors?.supportFocuses?.[index]?.requestsIds;
                        return (
                          <div>
                            <div className="mb-6 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 ">
                              {requests.map(request => (
                                <CheckBox
                                  type="checkbox"
                                  key={`supportFocuses.${index}.requestsIds-${request.id}`}
                                  name={`supportFocuses.${index}.requestsIds-${request.id}`}
                                  ref={ctrlField.ref}
                                  value={request.id}
                                  text={request.name}
                                  checked={selected.includes(request.id) ?? false}
                                  onBlur={ctrlField.onBlur}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      ctrlField.onChange([...selected, request.id]);
                                    } else {
                                      ctrlField.onChange(selected.filter(id => id !== request.id));
                                    }
                                  }}
                                />
                              ))}
                            </div>
                            {error && <p className="text-sm mt-1 text-red-500">{error}</p>}
                          </div>
                        );
                      }}
                    />
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => append()}>
          <IoMdAddCircleOutline className="h-6 w-6 text-primary-500" />
        </button>
        <button type="button" onClick={() => remove(fields.length - 1)}>
          <IoMdCloseCircleOutline className="h-6 w-6 text-system-error" />
        </button>
      </fieldset>
    </fieldset>
  );
}
Step4.propTypes = {
  therapies: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired,
};
