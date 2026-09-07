import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { TextInputField } from '@/app/_components/InputFields';

// `path` is set for fields that live outside the socialLink object.
const socialLinks = {
  instagram: { name: 'instagram', label: 'Instagram' },
  facebook: { name: 'facebook', label: 'Facebook' },
  youtube: { name: 'youtube', label: 'YouTube' },
  linkedin: { name: 'linkedin', label: 'LinkedIn' },
  tiktok: { name: 'tiktok', label: 'Tik Tok' },
  viber: { name: 'viber', label: 'Viber' },
  telegram: { name: 'telegram', label: 'Telegram' },
  website: { name: 'website', label: 'Веб сторінка', path: 'website' },
};

const allFields = Object.keys(socialLinks).filter(name => name !== 'website');

export function SocialLinksGroup({ title = 'Соціальні мережі', fields = allFields, isRequired = false }) {
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
        .map(field => socialLinks[field])
        .map(socialLink => (
          <div key={socialLink.name} className="mb-4 flex flex-col gap-1.5">
            <TextInputField
              {...register(socialLink.path ?? `socialLink.${socialLink.name}`)}
              label={socialLink.label}
              type="url"
              placeholder={socialLink.label}
              error={
                socialLink.path ? errors?.[socialLink.path]?.message : errors?.socialLink?.[socialLink.name]?.message
              }
              additionalContainerStyle="bg-other-white"
            />
          </div>
        ))}
    </fieldset>
  );
}

SocialLinksGroup.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(socialLinks))),
  isRequired: PropTypes.bool,
};
