import { required, SelectInput, SimpleForm, TextInput } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { SocialMediaSchema } from '@admin/_lib/validationSchemas/socialMediaSchema';
import { socialMediaChoices } from '@admin/components/SocialMedia/socialMediaChoices';

export function SocialMediaFormShared() {
  return (
    <SimpleForm className="max-w-[500px]" resolver={zodResolver(SocialMediaSchema)}>
      <SelectInput source="title" label="Соц мережа" validate={required()} choices={socialMediaChoices} fullWidth />
      <TextInput source="href" label="Посилання" validate={required()} fullWidth />
    </SimpleForm>
  );
}
