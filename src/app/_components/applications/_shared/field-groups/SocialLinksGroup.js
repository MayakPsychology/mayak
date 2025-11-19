import { useFormContext } from 'react-hook-form';
import { TextInputField } from '@/app/_components/InputFields';

const socialLinks = {
  instagram: {
    name: 'instagram',
    type: 'url',
    label: 'Instagram',
    placeholder: 'https://',
    isRequired: false,
  },
  facebook: {
    name: 'facebook',
    type: 'url',
    label: 'Facebook',
    placeholder: 'https://',
    isRequired: false,
  },
  youtube: {
    name: 'youtube',
    type: 'url',
    label: 'YouTube',
    placeholder: 'https://',
    isRequired: false,
  },
  linkedin: {
    name: 'linkedin',
    type: 'url',
    label: 'LinkedIn',
    placeholder: 'https://',
    isRequired: false,
  },
  tiktok: {
    name: 'tiktok',
    type: 'url',
    label: 'TikTok',
    placeholder: 'https://',
    isRequired: false,
  },
  viber: {
    name: 'viber',
    type: 'url',
    label: 'Viber',
    placeholder: 'https://',
    isRequired: false,
  },
  telegram: {
    name: 'telegram',
    type: 'url',
    label: 'Telegram',
    placeholder: 'https://',
    isRequired: false,
  },
};

export function SocialLinksGroup() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <fieldset>
      <legend className="text-base mb-2 block font-medium">Соціальні мережі</legend>

      {Object.values(socialLinks).map(socialLink => (
        <div key={socialLink.name} className="mb-4 flex flex-col gap-1.5">
          <TextInputField
            {...register(socialLink.name)}
            label={socialLink.label}
            type={socialLink.type}
            placeholder={socialLink.label}
            error={errors?.[socialLink.name]?.message}
            required={socialLink.isRequired}
            additionalContainerStyle="bg-other-white"
          />
        </div>
      ))}
    </fieldset>
  );
}
