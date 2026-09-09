'use client';

import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Controller, useFormContext } from 'react-hook-form';
import { ALLOWED_ATTACHMENT_TYPES, MAX_ATTACHMENTS_SIZE } from '@/lib/formData';
import { FieldHeading } from './FieldHeading';
import { FieldHints } from './FieldHint';

const errorClass = 'ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4';

const SIZE_HINT = 'До 4 МБ разом. Формати: PDF, JPG, PNG, DOC.';

const totalSize = files => files.reduce((sum, file) => sum + file.size, 0);

export function FileUploadField({ name, label, hints, isRequired = false }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name)?.message;

  return (
    <div>
      {label && <FieldHeading isRequired={isRequired}>{label}</FieldHeading>}
      <FieldHints hints={[...(hints ?? []), SIZE_HINT]} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const files = field.value ?? [];
          const add = ({ target }) => {
            const added = Array.from(target.files);
            // eslint-disable-next-line no-param-reassign
            target.value = '';
            field.onChange([...files, ...added].slice(0, 10));
          };

          return (
            <div className="flex flex-col items-start gap-3">
              <label className="cursor-pointer rounded-lg border border-primary-400/40 bg-primary-300 px-4 py-2 text-p4 font-bold text-primary-800 md:text-p3">
                Додати файл
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept={ALLOWED_ATTACHMENT_TYPES.join(',')}
                  onChange={add}
                  onBlur={field.onBlur}
                />
              </label>
              {files.map((file, index) => (
                <span key={file.name} className="flex items-center gap-2 text-p4 text-primary-900">
                  {file.name}
                  <button
                    type="button"
                    aria-label={`Видалити ${file.name}`}
                    className="text-system-error"
                    onClick={() => field.onChange(files.filter((_, i) => i !== index))}
                  >
                    ✕
                  </button>
                </span>
              ))}
              {totalSize(files) > MAX_ATTACHMENTS_SIZE && (
                <p className={errorClass}>Файли завеликі — сумарний розмір не має перевищувати 4 МБ</p>
              )}
            </div>
          );
        }}
      />
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

FileUploadField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  hints: PropTypes.array,
  isRequired: PropTypes.bool,
};
