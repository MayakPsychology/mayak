import { required } from 'react-admin';
import { useWatch } from 'react-hook-form';

export const useActiveRequired = () => {
  const isActive = useWatch({ name: 'isActive' });
  const requiredIfActive = isActive && required();
  return { isActive, requiredIfActive };
};
