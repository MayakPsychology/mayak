import PropTypes from 'prop-types';
import { Text } from '@react-email/components';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { Field, Layout, Section, format } from './parts';

export default function OrganizationApplicationTemplate({ data }) {
  const social = data.socialLink ?? {};
  const clients = data.clients ?? {};

  return (
    <Layout title={`Нова заявка від організації ${format(data.name)}`}>
      <Section title="Загальна інформація">
        <Field label="Назва" value={data.name} />
        <Field label="Типи організації" value={data.typeNames} />
        <Field
          label="Форма власності"
          value={FormTranslations.ownershipType[String(data.ownershipType).toLowerCase()]}
        />
        <Field label="Роки на ринку" value={data.yearsOnMarket} />
        <Field label="Стаж" value={data.yearsOfExperience} />
        <Field label="Формат роботи" value={FormTranslations.formatOfWork[String(data.formatOfWork).toLowerCase()]} />
        <Field label="Інклюзивний простір" value={data.isInclusiveSpace} />
        <Field label="Опис" value={data.description} />
      </Section>

      <Section title="Контакти">
        <Field label="Телефон" value={data.phone} />
        <Field label="Пошта" value={data.email} />
        <Field label="Веб сторінка" value={data.website} />
      </Section>

      <Section title="Соцмережі">
        <Field label="Instagram" value={social.instagram} />
        <Field label="Facebook" value={social.facebook} />
        <Field label="LinkedIn" value={social.linkedin} />
        <Field label="YouTube" value={social.youtube} />
        <Field label="TikTok" value={social.tiktok} />
        <Field label="Telegram" value={social.telegram} />
        <Field label="Viber" value={social.viber} />
      </Section>

      <Section title="Адреси">
        {data.addresses?.length ? (
          data.addresses.map(address => (
            <Text key={address.fullAddress} style={{ margin: '4px 0' }}>
              {format(address.fullAddress)} — {format(address.nameOfClinic)}
              {address.isPrimary ? ' (основна)' : ''}
            </Text>
          ))
        ) : (
          <Text style={{ margin: '4px 0' }}>Онлайн</Text>
        )}
      </Section>

      <Section title="Графік роботи">
        {data.workTime?.map(day => (
          <Text key={day.weekDay} style={{ margin: '4px 0' }}>
            {format(day.weekDay)}: {day.isDayOff ? 'вихідний' : format(day.time)}
          </Text>
        ))}
      </Section>

      <Section title="Клієнти">
        <Field label="Працює з" value={clients.workingWithNames} />
        <Field label="Працює з (інше)" value={clients.workingWithOther} />
        <Field label="Не працює з" value={clients.notWorkingWithNames} />
        <Field label="Не працює з (інше)" value={clients.notWorkingWithOther} />
      </Section>

      <Section title="Спеціалізації працівників">
        <Field label="Спеціалізації" value={data.expertSpecializationNames} />
      </Section>

      <Section title="Типи допомоги">
        <Field label="Безкоштовний прийом" value={data.isFreeReception} />
        {data.supportFocuses?.map(focus => (
          <div key={focus.therapy?.id} style={{ marginBottom: '10px' }}>
            <Field label="Терапія" value={focus.therapy?.title} />
            <Field label="Ціна" value={focus.price} />
            <Field label="Запити" value={focus.requestsNames} />
          </div>
        ))}
      </Section>
    </Layout>
  );
}

OrganizationApplicationTemplate.propTypes = { data: PropTypes.object.isRequired };
