import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { TextInputField } from '@/app/_components/InputFields';

const contacts = {
  phone: {
    name: 'phone',
    type: 'tel',
    label: 'Телефон',
    placeholder: '+380 (__) ___ __ __',
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Пошта',
    placeholder: 'example@gmail.com',
  },
  website: {
    name: 'website',
    type: 'url',
    label: 'Веб сторінка',
    placeholder: 'https://',
  },
};

const allFields = Object.keys(contacts);

export function ContactsGroup({ title = 'Контактна інформація', fields = allFields, isRequired = false }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <fieldset>
      <legend className="text-base mb-2 block font-medium">
        {title} {isRequired && <span className="text-red-500">*</span>}
      </legend>

      {fields
        .map(field => contacts[field])
        .map(contact => (
          <div key={contact.name} className="mb-4 flex flex-col gap-1.5">
            <TextInputField
              {...register(contact.name)}
              label={contact.label}
              type={contact.type}
              placeholder={contact.placeholder}
              error={errors?.[contact.name]?.message}
              additionalContainerStyle="bg-other-white"
            />
          </div>
        ))}
    </fieldset>
  );
}

ContactsGroup.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.oneOf(allFields)),
  isRequired: PropTypes.bool,
};
