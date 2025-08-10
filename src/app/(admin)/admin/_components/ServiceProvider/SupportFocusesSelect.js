'use client';

import {
  ArrayInput,
  AutocompleteArrayInput,
  AutocompleteInput,
  FormDataConsumer,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  SimpleFormIterator,
  required,
  useGetList,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useCallback } from 'react';

function SupportFocusesForm({ getSource, supportFocuses, selectedTherapies, requestsIds, loading }) {
  const { setValue } = useFormContext();

  const therapySource = getSource('therapy.id');
  const therapyIndex = Number(therapySource.split('.')[1]);

  const resetRequests = useCallback(
    (_, record) => {
      const newCuts = supportFocuses.map((focus, i) => {
        if (i !== therapyIndex) {
          return focus;
        }

        return { ...focus, therapy: record, requestsIds: [] };
      });
      setValue('supportFocuses', newCuts);
    },
    [setValue, supportFocuses, therapyIndex],
  );

  return (
    <>
      <ReferenceInput
        source={getSource('therapy.id')}
        filter={{ id: { notIn: selectedTherapies } }}
        reference="Therapy"
        fullWidth
      >
        <AutocompleteInput
          isLoading={loading}
          optionText="title"
          optionValue="id"
          label="Тип терапії"
          validate={required()}
          onChange={resetRequests}
          fullWidth
        />
      </ReferenceInput>

      <NumberInput fullWidth source={getSource('price')} label="Ціна для терапії від Х грн.год" />
      <ReferenceArrayInput
        source={getSource('requestsIds')}
        reference="Request"
        filter={{ id: { in: requestsIds } }}
        sort={{ field: 'name', order: 'ASC' }}
        perPage={1000}
      >
        <AutocompleteArrayInput
          isLoading={loading}
          label="Запити які лікуються типом терапії"
          fullWidth
          optionText="name"
          optionValue="id"
        />
      </ReferenceArrayInput>
    </>
  );
}

SupportFocusesForm.propTypes = {
  getSource: PropTypes.func,
  // supportFocuses: therapyPropType,
  supportFocuses: PropTypes.object,
  selectedTherapies: PropTypes.arrayOf(PropTypes.string),
  requestsIds: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

export function SupportFocusesSelect() {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const supportFocuses = useWatch({ name: 'supportFocuses' });

  const selectedTherapiesIds = supportFocuses?.map(focus => focus.therapy && focus.therapy.id).filter(Boolean) ?? [];

  const therapyRequestsIds = useCallback(
    therapyId => therapiesList.find(therapy => therapy.id === therapyId)?.requests.map(request => request.id) || [],
    [therapiesList],
  );

  const selectedAllTerapies = supportFocuses?.length === therapiesList?.length;
  return (
    <ArrayInput source="supportFocuses" isLoading={therapiesLoading} label="Типи терапій">
      <SimpleFormIterator fullWidth disableReordering={true} disableAdd={selectedAllTerapies}>
        <FormDataConsumer>
          {({ scopedFormData, getSource }) => {
            if (!scopedFormData) return null;
            return (
              <SupportFocusesForm
                getSource={getSource}
                supportFocuses={supportFocuses}
                selectedTherapies={selectedTherapiesIds}
                requestsIds={therapyRequestsIds(scopedFormData?.therapy?.id || '')}
                loading={therapiesLoading}
              />
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
}
