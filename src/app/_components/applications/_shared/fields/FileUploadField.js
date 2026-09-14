'use client';

import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { upload } from '@vercel/blob/client';
import { Controller, useFormContext } from 'react-hook-form';
import { ALLOWED_ATTACHMENT_TYPES, MAX_FILES } from '@/lib/uploads';
import { FieldHeading } from './FieldHeading';
import { FieldHints } from './FieldHint';
import { compressImage } from './compressImage';

const errorClass = 'ml-4 mt-[4px] text-[12px] font-semibold text-system-error lg:text-p4';

const SIZE_HINT =
  'Завантажте щонайбільше 10 файлів підтримуваного типу (PDF, document або image). Розмір одного файлу не може перевищувати 10 MB.';

const STORAGE_HINT =
  'Документи зберігаються у захищеному сховищі до 90 днів, використовуються лише для перевірки кваліфікації та не публікуються на сайті.';

const newId = () => window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function FileUploadField({ name, label, hints, isRequired = false }) {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [failed, setFailed] = useState({});
  const pending = useRef(new Map());

  const error = get(errors, name)?.message ?? get(errors, name)?.root?.message;

  const patch = (id, changes) => {
    const current = getValues(name) ?? [];
    setValue(
      name,
      current.map(entry => (entry.id === id ? { ...entry, ...changes } : entry)),
      { shouldValidate: true },
    );
  };

  const send = async (id, file) => {
    setFailed(state => ({ ...state, [id]: null }));

    try {
      const blob = await upload(`applications/${name}/${file.name}`, file, {
        access: 'private',
        handleUploadUrl: '/api/upload',
      });

      patch(id, { url: blob.url, pathname: blob.pathname });
      pending.current.delete(id);
    } catch (uploadError) {
      setFailed(state => ({ ...state, [id]: uploadError?.message || 'Не вдалося завантажити' }));
    }
  };

  const add = async ({ target }) => {
    const picked = Array.from(target.files);
    // eslint-disable-next-line no-param-reassign
    target.value = '';

    const prepared = await Promise.all(picked.map(compressImage));
    const entries = prepared.map(file => ({
      id: newId(),
      name: file.name,
      size: file.size,
      url: null,
      pathname: null,
    }));

    entries.forEach((entry, index) => pending.current.set(entry.id, prepared[index]));
    setValue(name, [...(getValues(name) ?? []), ...entries], { shouldValidate: true });

    await Promise.all(entries.map((entry, index) => send(entry.id, prepared[index])));
  };

  return (
    <div>
      {label && <FieldHeading isRequired={isRequired}>{label}</FieldHeading>}
      <FieldHints hints={[...(hints ?? []), SIZE_HINT, STORAGE_HINT]} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const files = field.value ?? [];

          const drop = id => {
            pending.current.delete(id);
            setFailed(state => ({ ...state, [id]: null }));
            field.onChange(files.filter(entry => entry.id !== id));
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
                  disabled={files.length >= MAX_FILES}
                />
              </label>

              {files.map(entry => (
                <span key={entry.id} className="flex items-center gap-2 text-p4 text-primary-900">
                  {entry.name}
                  {!entry.url && !failed[entry.id] && <em className="not-italic text-gray-800">завантажується…</em>}
                  {failed[entry.id] && (
                    <>
                      <em className="not-italic text-system-error">{failed[entry.id]}</em>
                      <button
                        type="button"
                        className="underline"
                        onClick={() => send(entry.id, pending.current.get(entry.id))}
                      >
                        Повторити
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    aria-label={`Видалити ${entry.name}`}
                    className="text-system-error"
                    onClick={() => drop(entry.id)}
                  >
                    ✕
                  </button>
                </span>
              ))}
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
