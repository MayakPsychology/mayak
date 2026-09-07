import {
  ArrayInput,
  BooleanField,
  BooleanInput,
  FormDataConsumer,
  Labeled,
  required,
  SelectInput,
  SimpleFormIterator,
  TextInput,
  useGetList,
} from 'react-admin';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import get from 'lodash/get';
import { FormatOfWork } from '@prisma/client';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { districtPropType } from '@/app/(admin)/admin/_lib/specialistPropTypes';
import Loading from '@/app/loading';
import { CoordinateInput } from './CoordinateInput';

function AddressForm({ getSource, cities, type, readOnly = false }) {
  const isCreate = type === FORM_TYPES.create;
  const citySource = getSource(isCreate ? 'city' : 'cityId');
  const districtSource = getSource(isCreate ? 'district' : 'districtId');

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
      <SelectInput
        fullWidth
        InputProps={{
          readOnly,
        }}
        label="Місто"
        source={citySource}
        optionText="name"
        optionValue="id"
        validate={required()}
        choices={cities.map(city => ({ id: city.id, name: city.name }))}
      />
      {/* The district list depends on the chosen city, and stays hidden for cities without one. */}
      <FormDataConsumer>
        {({ formData }) => {
          const selectedCityId = get(formData, citySource);
          const districts = cities.find(city => city.id === selectedCityId)?.districts ?? [];
          if (!districts.length) return null;

          return (
            <SelectInput
              fullWidth
              InputProps={{
                readOnly,
              }}
              label="Район"
              source={districtSource}
              optionText="name"
              optionValue="id"
              choices={districts.map(district => ({ id: district.id, name: district.name }))}
            />
          );
        }}
      </FormDataConsumer>
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
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      districts: PropTypes.arrayOf(districtPropType),
    }),
  ),
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
  const { data: cities, isLoading } = useGetList(RESOURCES.city);
  const { data: districts, isLoading: isDistrictsLoading } = useGetList(RESOURCES.district);
  if (isLoading || isDistrictsLoading) return <Loading />;

  const citiesWithDistricts = (cities ?? []).map(city => ({
    ...city,
    districts: (districts ?? []).filter(district => district.cityId === city.id),
  }));
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
                          <AddressForm getSource={getSource} readOnly type={type} cities={citiesWithDistricts} />
                        ) : (
                          <AddressForm getSource={getSource} type={type} cities={citiesWithDistricts} />
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
