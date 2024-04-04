import React from 'react';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';
import PropTypes from 'prop-types';
import { required, TextInput } from 'react-admin';
import { useFormState, useWatch } from 'react-hook-form';
import { MAX_NUM_SELECTED_SOCIAL_LINKS } from '@admin/_lib/consts';

export function SocialLinks({ className }) {
  const { instagram, facebook, youtube, linkedin, tiktok, viber, telegram } = SpecialistFormFields;
  const socialMediaList = [instagram, facebook, youtube, linkedin, tiktok, viber, telegram];

  const socialLinkObject = useWatch({ name: 'socialLink' });
  const selectedSocialLinkNum = socialLinkObject ? Object.values(socialLinkObject).filter(link => link)?.length : 0;

  const { errors } = useFormState();

  const isSelectedLinkNumWithinAllowedRange = selectedSocialLinkNum <= MAX_NUM_SELECTED_SOCIAL_LINKS;
  const socialLinkErrorMessage = errors?.socialLink?.root ? errors?.socialLink.root.message : '';

  const displayError = !isSelectedLinkNumWithinAllowedRange && (
    <p className="my-1 text-c3 tracking-wide text-system-error">{socialLinkErrorMessage}</p>
  );

  return (
    <FormFieldWrapper title={SpecialistFormSections.socialLinks} className={className} name="socialLink">
      {displayError}
      <div className="grid w-full gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        {socialMediaList.map(({ name, type, label, isRequired, ...inputProps }) => (
          <TextInput
            key={name}
            name={`socialLink.${name}`}
            source={name}
            type={type}
            label={label}
            validate={[isRequired && required()]}
            className={className}
            {...inputProps}
          />
        ))}
      </div>
    </FormFieldWrapper>
  );
}

SocialLinks.propTypes = {
  className: PropTypes.string,
};
