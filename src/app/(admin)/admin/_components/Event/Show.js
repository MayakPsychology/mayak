import React from 'react';
import PropTypes from 'prop-types';
import { EventFormat, EventPriceFormat } from '@prisma/client';
import {
  Show,
  SimpleShowLayout,
  TextField,
  RichTextField,
  DateField,
  NumberField,
  BooleanField,
  useGetRecordId,
  Labeled,
  useGetOne,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { TagList } from './TagList';

function ShowLayout() {
  const eventId = useGetRecordId();
  const { data, isLoading, error } = useGetOne(RESOURCES.event, { id: eventId });
  return (
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="organizerName" />
      <RichTextField source="notes" emptyText="No notes..." />
      <TextField source="format" />
      {data?.format !== EventFormat.ONLINE && <TextField source="address" />}
      {data?.locationLink && (
        <Labeled label="Location link">
          <Wrapped>
            <a className="text-[#0000EE]" rel="noopener noreferrer" target="_blank" href={data.locationLink}>
              {data.locationLink}
            </a>
          </Wrapped>
        </Labeled>
      )}
      <DateField source="createdAt" />
      <DateField source="eventDate" />
      <TextField source="priceType" />
      {data?.priceType !== EventPriceFormat.FREE && <NumberField source="price" />}
      <BooleanField source="isActive" />
      <Labeled label="Event Tags">
        {data?.tags?.length ? (
          <TagList tags={data?.tags} isLoading={isLoading} error={error && 'Error happened while loading data'} />
        ) : (
          <TextField emptyText="No event tags" />
        )}
      </Labeled>
      {data?.additionalLink && (
        <Labeled label="Additional Link">
          <Wrapped>
            <span>{data.additionalLink.label}</span>:{' '}
            <a className="text-[#0000EE]" rel="noopener noreferrer" target="_blank" href={data.additionalLink.link}>
              {data.additionalLink.link}
            </a>
          </Wrapped>
        </Labeled>
      )}
    </SimpleShowLayout>
  );
}

// Must use a component for <Labeled/> wrapper to take effect
function Wrapped({ children }) {
  return <div>{children}</div>;
}
Wrapped.propTypes = {
  children: PropTypes.node,
};

export function EventShow() {
  return (
    <Show>
      <ShowLayout />
    </Show>
  );
}
