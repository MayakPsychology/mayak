import { useNotify, useRedirect } from 'react-admin';

export const useRedirectToList = ({ successMessage = 'Success', redirectPath, errorMessage = '' }) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = () => {
    notify(successMessage);
    redirect(redirectPath);
  };

  const handleError = error => {
    notify(errorMessage || error.message);
  };
  return { handleError, handleSuccess };
};
