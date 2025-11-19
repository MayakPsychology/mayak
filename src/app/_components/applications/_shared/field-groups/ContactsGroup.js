import { useFormContext } from 'react-hook-form';
import { TextInputField } from '@/app/_components/InputFields';

const contacts = {
  phone: {
    name: 'phone',
    type: 'tel',
    label: 'Телефон',
    placeholder: '+380...',
    isRequired: false,
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Пошта',
    placeholder: 'example@gmail.com',
    isRequired: false,
  },
  website: {
    name: 'website',
    type: 'url',
    label: 'Веб сторінка',
    placeholder: 'https://',
    isRequired: false,
  },
};

export function ContactsGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <fieldset>
      <legend className="text-base mb-2 block font-medium">Контактна інформація</legend>

      {Object.values(contacts).map(contact => (
        <div key={contact.name} className="mb-4 flex flex-col gap-1.5">
          <TextInputField
            {...register(contact.name)}
            label={contact.label}
            type={contact.type}
            placeholder={contact.label}
            error={errors?.[contact.name]?.message}
            required={contact.isRequired}
            additionalContainerStyle="bg-other-white"
          />
        </div>
      ))}
    </fieldset>
  );
}
