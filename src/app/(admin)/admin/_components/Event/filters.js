import { SearchInput, DateTimeInput, SelectInput } from 'react-admin';
import { QuickFilter } from '@admin/components/QuickFilter';
import { EventFormat } from '@prisma/client';

export const eventFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <DateTimeInput key="fromDate" label="Дата події від:" source="eventDate_gte" alwaysOn />,
  <DateTimeInput key="toDate" label="Дата події до:" source="eventDate_lte" alwaysOn />,
  <SelectInput
    label="Формат заходу"
    key="format"
    source="format_enum"
    choices={[
      { id: undefined, name: 'Обидва' },
      { id: EventFormat.OFFLINE, name: 'Офлайн' },
      { id: EventFormat.ONLINE, name: 'Онлайн' },
      { id: EventFormat.ONLINE_OFFLINE, name: 'Офлайн + трансляція' },
    ]}
    alwaysOn
  />,
  <DateTimeInput key="fromCreationDate" label="Дата додавання події від:" source="createdAt_gte" alwaysOn />,
  <DateTimeInput key="toCreationDate" label="Дата додавання події до:" source="createdAt_lte" alwaysOn />,
  <SelectInput
    key="status"
    label="Статус"
    source="isActive"
    choices={[
      { id: undefined, name: 'Обидва' },
      { id: true, name: 'Активний' },
      { id: false, name: 'Неактивний' },
    ]}
    alwaysOn
  />,
  <QuickFilter key="futureEvents" source="eventDate_gt" label="Майбутні події" defaultValue={new Date()} />,
  <QuickFilter key="archivedEvents" source="eventDate_lt" label="Архівовані події" defaultValue={new Date()} />,
];
