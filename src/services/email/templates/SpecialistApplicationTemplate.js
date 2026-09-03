import PropTypes from 'prop-types';
import { Text } from '@react-email/components';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';
import { Field, Layout, Section, format } from './parts';

export default function SpecialistApplicationTemplate({ data }) {
  const social = data.socialLink ?? {};
  const clients = data.clients ?? {};

  return (
    <Layout title={`Нова заявка від ${format(data.firstName)} ${format(data.lastName)}`}>
      <Section title="Загальна інформація">
        <Field label="Ім'я" value={data.firstName} />
        <Field label="Прізвище" value={data.lastName} />
        <Field label="По-батькові" value={data.surname} />
        <Field label="Стать" value={FormTranslations.gender[String(data.gender).toLowerCase()]} />
        <Field label="Стаж" value={data.yearsOfExperience} />
        <Field label="Формат роботи" value={FormTranslations.formatOfWork[String(data.formatOfWork).toLowerCase()]} />
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

      <Section title="Спеціалізації">
        {data.specializationAdditionalInfo?.map(spec => (
          <div key={spec.specializationId} style={{ marginBottom: '10px' }}>
            <Text style={{ margin: '4px 0' }}>
              <strong>{format(spec.specialization)}</strong>
            </Text>
            <Field label="Методи" value={spec.methodNames} />
            <Field label="Методи (інше)" value={spec.methodsOther} />
            <Field label="Професійний розвиток" value={spec.professionalDevelopment} />
            <Field label="Особиста терапія" value={spec.personalTherapy} />
            <Field label="Супервізії" value={spec.supervisionExperience} />
          </div>
        ))}
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

SpecialistApplicationTemplate.propTypes = { data: PropTypes.object.isRequired };
