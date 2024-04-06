import { Create, SimpleForm, TextInput, required } from 'react-admin';
import { useRedirectToList } from '../ServiceProvider/hooks';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '../../_lib/consts';

export function ClientCategoryCreate() {
  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.clientCategory}`,
  });
  return (
    <Create mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}>
      <SimpleForm>
        <TextInput label="Категорія клієнтів" source="name" validate={[required()]} multiline={true} fullWidth />
      </SimpleForm>
    </Create>
  );
}
