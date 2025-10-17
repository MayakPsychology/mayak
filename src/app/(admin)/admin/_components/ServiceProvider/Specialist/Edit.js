import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, SimpleForm, TextInput, useGetList } from 'react-admin';
import { specialistEditValidationSchema } from '@admin/_lib/validationSchemas/specialistSchema';
import { transformSpecialistEditData } from '@admin/_utils/transformSpecialistEditData';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { PSYCHOLOGIST, PSYCHOTHERAPIST, RESOURCES } from '@admin/_lib/consts';
import { WorkTimeForm } from '@admin/components/ServiceProvider/WorkTimeForm';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

export function SpecialistEdit() {
  const { data: specializationsData } = useGetList(RESOURCES.specialization);
  const handleTransform = ({ specializationsIds, specializationMethodsIds, socialLink, ...rest }) => {
    const selectedSpecializationNamesList = specializationsIds.map(id => {
      const specializationData = specializationsData.find(s => s.id === id);
      return specializationData.name.toLowerCase();
    });
    const psychologistMethodsList = selectedSpecializationNamesList.includes(PSYCHOLOGIST.toLowerCase())
      ? specializationMethodsIds.psychologist
      : [];
    const psychotherapistMethodsList = selectedSpecializationNamesList.includes(PSYCHOTHERAPIST.toLowerCase())
      ? specializationMethodsIds.psychotherapist
      : [];
    
    const flattenedSocialLinks = socialLink ? { ...socialLink } : {};

    return transformSpecialistEditData({
      ...rest,
      ...flattenedSocialLinks,
      specializationsIds,
      specializationMethodsIds: {
        psychologist: psychologistMethodsList,
        psychotherapist: psychotherapistMethodsList,
      },
    });
  };

  return (
    <Edit title="Редагувати дані спеціаліста" transform={handleTransform} mutationMode="pessimistic">
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
