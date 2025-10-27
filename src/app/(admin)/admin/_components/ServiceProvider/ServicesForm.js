import PropTypes from 'prop-types';
import { BooleanInput } from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { SupportFocusesSelect } from './SupportFocusesSelect';
import { useActiveRequired } from './hooks/useActiveRequired';

export function ServicesForm({ validate, label }) {
  const { requiredIfActive } = useActiveRequired();

  return (
    <FormFieldWrapper title={label}>
      <SupportFocusesSelect />
      <BooleanInput
        name="isFreeReception"
        source="isFreeReception"
        label="Безкоштовний прийом"
        className="mt-8 w-full"
        validate={validate || requiredIfActive}
      />
    </FormFieldWrapper>
  );
}

ServicesForm.propTypes = {
  label: PropTypes.string,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
