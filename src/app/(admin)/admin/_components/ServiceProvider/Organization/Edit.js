import { Edit, SimpleForm, required } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { organizationEditValidationSchema } from '@admin/_lib/validationSchemas/organizationSchema';
import { transformOrganizationEditData } from '@admin/_utils/transformOrganizationEditData';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { DescriptionEdit } from '@admin/components/ServiceProvider/DescriptionEdit';
import { WorkTimeForm } from '@admin/components/ServiceProvider/WorkTimeForm';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { DetailsEditOrg } from './DetailsEditOrg';
import { GeneralInfoEditOrg } from './GeneralInfoEditOrg';

export function OrganizationEdit() {
  return (
    <Edit title="Редагування данних організації" transform={transformOrganizationEditData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(organizationEditValidationSchema)}>
        <GeneralInfoEditOrg type="edit" />
        <DetailsEditOrg />
        <AddressesForm label="Адреси надання послуг" type="edit" />
        <WorkTimeForm />
        <ServicesForm type="edit" label="Послуги" />
        <DescriptionEdit validate={required()} />
        <ContactsList />
        <SocialLinks />
        <ActivationForm label="Активувати/деактивувати організацію" className="mt-3" />
      </SimpleForm>
    </Edit>
  );
}
