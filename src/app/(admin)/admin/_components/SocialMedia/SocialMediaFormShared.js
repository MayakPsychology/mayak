import { required, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { SocialMediaSchema } from '@admin/_lib/validationSchemas/socialMediaSchema';
import { socialMediaChoices } from '@admin/components/SocialMedia/socialMediaChoices';
import PropTypes from 'prop-types';

export function SocialMediaFormShared(props) {
  return (
    <SimpleForm className="max-w-[500px]" resolver={zodResolver(SocialMediaSchema)} {...props}>
      <SelectInput source="title" label="Соц мережа" validate={required()} choices={socialMediaChoices} fullWidth />
      <TextInput source="href" label="Посилання" validate={required()} fullWidth />
    </SimpleForm>
  );
}

SocialMediaFormShared.propTypes = {
  props: PropTypes.object,
};
