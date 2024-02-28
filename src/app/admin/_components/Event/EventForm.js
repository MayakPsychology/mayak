import {
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
  SelectInput,
  NumberInput,
  useEditContext,
  Loading,
} from 'react-admin';
import { TagSelect } from './TagSelect';
import { useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EventSchema } from '@admin/_lib/validationSchemas/eventSchema';

const fieldGroupClass = 'flex flex-col md:flex-row md:gap-6';

function PriceInput() {
  const priceType = useWatch({ name: 'priceType' });
  return (
    <>
      <span className="self-center">{priceType === 'MIN_PRICE' && 'від'}</span>
      <NumberInput disabled={priceType === 'FREE'} label="Вартість" source="price" />
    </>
  );
}

function AddressInput() {
  const format = useWatch({ name: 'format' });
  return (
    <>
      <TextInput disabled={format !== 'OFFLINE'} source="address" label="Адреса чи назва приміщення" className="w-96" />
      <TextInput disabled={format !== 'OFFLINE'} source="locationLink" label="Посилання на локацію" className="w-96" />
    </>
  );
}

export function EventFormEdit({ toolbar, setSelectedTags }) {
  // it is possible that form will be rendered even if tags of event
  // are still being fetched, so we need all data to be fetched before rendering a form
  const { isFetching, isLoading, record } = useEditContext();
  if (isFetching || isLoading) return <Loading />;
  const recordTags = record.tags.map(tag => ({ label: tag.name, value: tag.name }));
  return <EventForm toolbar={toolbar} setSelectedTags={setSelectedTags} recordTags={recordTags} />;
}

export function EventForm({ toolbar, setSelectedTags, recordTags }) {
  return (
    <SimpleForm resolver={zodResolver(EventSchema)} toolbar={toolbar}>
      <p className="font-bold">Основна інформація</p>
      <TextInput source="title" label="Назва події" validate={required()} className="w-72" />
      <TextInput source="organizerName" label="Ім'я організатора" validate={required()} className="w-72" />
      <TextInput className="mt-32 w-96" source="notes" label="Коментарі" multiline />
      <DateTimeInput source="eventDate" label="Дата події" validate={required()} />
      <p className="font-bold">Вартість</p>
      <div className={fieldGroupClass}>
        <SelectInput
          source="priceType"
          choices={[
            { id: 'FREE', name: 'Безкоштовно' },
            { id: 'FIXED_PRICE', name: 'Фіксована вартість' },
            { id: 'MIN_PRICE', name: 'Мінімальна вартість' },
          ]}
          label="Варіанти"
          validate={required()}
        />
        <PriceInput />
      </div>
      <p className="font-bold">Формат та локація</p>
      <div className={fieldGroupClass}>
        <SelectInput
          source="format"
          choices={[
            { id: 'OFFLINE', name: 'Офлайн' },
            { id: 'ONLINE', name: 'Онлайн' },
          ]}
          label="Формат події"
          validate={required()}
        />
        <AddressInput />
      </div>
      <p className="font-bold">Теги події</p>
      <TagSelect setSelectedTags={setSelectedTags} defaultValue={recordTags} />
      <p className="mt-6 font-bold">
        Додаткове посилання(У поле тип введіть що це за посилання: телеграм, вебсайт тощо)
      </p>
      <div className={fieldGroupClass}>
        <TextInput source="additionalLink.label" label="Тип" />
        <TextInput source="additionalLink.link" label="Посилання" fullWidth />
      </div>
    </SimpleForm>
  );
}
