import {
  ArrayInput,
  BooleanField,
  BooleanInput,
  FormDataConsumer,
  Labeled,
  ReferenceInput,
  required,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  useGetList,
} from 'react-admin';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { FormatOfWork } from '@prisma/client';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { districtPropType } from '@/app/(admin)/admin/_lib/specialistPropTypes';
import Loading from '@/app/loading';
import { CoordinateInput } from './CoordinateInput';

function AddressForm({ getSource, districts, type, readOnly = false }) {
  return (
    <>
      {readOnly ? (
        <Labeled label="Головна адреса" className="ml-[13px]">
          <BooleanField source={getSource('isPrimary')} />
        </Labeled>
      ) : (
        <BooleanInput source={getSource('isPrimary')} label="Головна адреса" fullWidth className="mb-[-0.6rem] mt-4" />
      )}
      <TextInput
        InputProps={{
          readOnly,
        }}
        fullWidth
        source={getSource('fullAddress')}
        label="Повна адреса"
        validate={required()}
        helperText="Вулиця, номер будинку, поверх, кабінет"
      />
      <TextInput
        InputProps={{
          readOnly,
        }}
        source={getSource('nameOfClinic')}
        label="Назва клініки"
        fullWidth
      />
      {type === FORM_TYPES.create ? (
        <SelectInput
          fullWidth
          InputProps={{
            readOnly,
          }}
          label="Район"
          source={getSource('district')}
          optionText="name"
          optionValue="id"
          validate={required()}
          choices={districts.map(district => ({ id: district.id, name: district.name }))}
        />
      ) : (
        <ReferenceInput source={getSource('districtId')} reference="District">
          <SelectInput
            fullWidth
            InputProps={{
              readOnly,
            }}
            label="Район"
            optionText="name"
            optionValue="id"
            validate={required()}
          />
        </ReferenceInput>
      )}
      <Stack direction="row" gap="10px">
        <CoordinateInput
          label="Широта точки"
          source={getSource('latitude')}
          readOnly={readOnly}
          validate={required()}
        />
        <CoordinateInput
          label="Довгота точки"
          source={getSource('longitude')}
          readOnly={readOnly}
          validate={required()}
        />
      </Stack>
    </>
  );
}

AddressForm.propTypes = {
  getSource: PropTypes.func.isRequired,
  districts: PropTypes.arrayOf(districtPropType),
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  readOnly: PropTypes.bool,
};

function HelperText({ children }) {
  return <p className="mb-6 text-gray-700">{children}</p>;
}

HelperText.propTypes = {
  children: PropTypes.node,
};

export function AddressesForm({ type = FORM_TYPES.create, label, className }) {
  const { data: districts, isLoading } = useGetList(RESOURCES.district);
  if (isLoading) return <Loading />;
  return (
    <FormFieldWrapper title={label} className={className}>
      <FormDataConsumer>
        {({ formData }) => {
          if (!formData) return null;
          const { formatOfWork } = formData;
          const onlineOnly = formatOfWork === FormatOfWork.ONLINE;
          const disabled = onlineOnly || !formatOfWork;

          return (
            <>
              {!formatOfWork && <HelperText>Оберіть формат роботи</HelperText>}
              {onlineOnly && <HelperText>Спеціаліст працює тільки онлайн</HelperText>}
              {formatOfWork && !onlineOnly && (
                <ArrayInput source="addresses" label="Адреси" validate={required()}>
                  <SimpleFormIterator inline disableReordering fullWidth disableAdd={disabled}>
                    <FormDataConsumer>
                      {({ scopedFormData, getSource }) => {
                        if (!scopedFormData) return null;
                        return scopedFormData.id ? (
                          <AddressForm getSource={getSource} readOnly type={type} districts={districts} />
                        ) : (
                          <AddressForm getSource={getSource} type={type} districts={districts} />
                        );
                      }}
                    </FormDataConsumer>
                  </SimpleFormIterator>
                </ArrayInput>
              )}
            </>
          );
        }}
      </FormDataConsumer>
    </FormFieldWrapper>
  );
}

AddressesForm.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  label: PropTypes.string,
  className: PropTypes.string,
};
