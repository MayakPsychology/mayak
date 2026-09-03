import PropTypes from 'prop-types';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { Field, Layout, format } from './parts';

const formatDate = value => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('uk-UA');
};

export default function EventApplicationTemplate({ data }) {
  return (
    <Layout title={`Нова заявка на подію ${format(data.title)}`}>
      <Field label="Назва події" value={data.title} />
      <Field label="Організатор" value={data.organizerName} />
      <Field label="Дата події" value={formatDate(data.eventDate)} />
      <Field label="Формат" value={FormTranslations.eventFormat[String(data.format).toLowerCase()]} />
      <Field label="Місце проведення" value={data.address} />
      <Field label="Вартість" value={FormTranslations.eventPriceFormat[String(data.priceType).toLowerCase()]} />
      <Field label="Ціна" value={data.price} />
      <Field label="Опис події" value={data.notes} />
      <Field label="Посилання" value={data.additionalLink?.link} />
    </Layout>
  );
}

EventApplicationTemplate.propTypes = { data: PropTypes.object.isRequired };
