import { transformOrganizationData } from '@admin/_utils/transformOrganizationData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Create, required, SimpleForm } from 'react-admin';
import { organizationCreateValidationSchema } from '@admin/_lib/validationSchemas/organizationSchema';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { WorkTimeForm } from '@admin/components/ServiceProvider/WorkTimeForm';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { DescriptionEdit } from '@admin/components/ServiceProvider/DescriptionEdit';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { DetailsEditOrg } from './DetailsEditOrg';
import { GeneralInfoEditOrg } from './GeneralInfoEditOrg';

export function OrganizationCreate() {
  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.organization}`,
  });

  return (
    <Create
      title="Додавання нової організації"
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      transform={transformOrganizationData}
    >
      <SimpleForm resolver={zodResolver(organizationCreateValidationSchema)}>
        <GeneralInfoEditOrg type="create" />
        <DetailsEditOrg />
        <AddressesForm label="Адреси надання послуг" />
        <WorkTimeForm />
        <ServicesForm label="Послуги" />
        <DescriptionEdit validate={required()} />
        <ContactsList />
        <SocialLinks />
        <ActivationForm label="Активувати/деактивувати організацію" />
      </SimpleForm>
    </Create>
  );
}
