import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, SimpleForm, TextInput, useGetList } from 'react-admin';
import { specialistEditValidationSchema } from '@admin/_lib/validationSchemas/specialistSchema';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { WorkTimeForm } from '@admin/components/ServiceProvider/WorkTimeForm';
import { filterMethodsBySpecializations } from '@admin/_utils/filterMethodsBySpecializations';
import { transformSpecialistData } from '@admin/_utils/transformSpecialistData';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

export function SpecialistEdit() {
  const { data: specializationsData } = useGetList(RESOURCES.specialization);

  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.updated,
    redirectPath: `/${RESOURCES.specialist}`,
  });

  const handleTransform = data =>
    transformSpecialistData(
      {
        ...data,
        specializationMethods: filterMethodsBySpecializations(
          data.specializationsIds,
          data.specializationMethodsIds,
          specializationsData,
        ),
      },
      { isEdit: true },
    );

  return (
    <Edit
      title="Редагувати дані спеціаліста"
      transform={handleTransform}
      mutationMode="pessimistic"
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
    >
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(specialistEditValidationSchema)}>
        <GeneralInfoEditSpec type="edit" />
        <DetailsEditSpec />
        <AddressesForm type="edit" label="Адреси надання послуг" />
        <WorkTimeForm />
        <ServicesForm type="edit" label="Послуги" />
        <TextInput name="description" source="description" label="Опис" fullWidth multiline />
        <ContactsList />
        <SocialLinks />
        <ActivationForm label="Активувати/деактивувати спеціаліста" />
      </SimpleForm>
    </Edit>
  );
}
