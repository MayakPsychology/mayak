import { Create } from 'react-admin';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { SocialMediaFormShared } from '@admin/components/SocialMedia/SocialMediaFormShared';
import { socialMediaUseRedirectParams } from '@admin/components/SocialMedia/consts';

export function SocialMediaCreate() {
  const { handleError, handleSuccess } = useRedirectToList(socialMediaUseRedirectParams);

  return (
    <Create title="Додавання нової соц мережі" mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}>
      <SocialMediaFormShared />
    </Create>
  );
}
