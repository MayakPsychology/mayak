import { EventFormat, EventPriceFormat, FormatOfWork, Gender, OwnershipType } from '@prisma/client';
import { FormTranslations } from '@/app/(admin)/admin/_lib/translations';

// The public forms print options in lower case and in the order the mocks list them,
// which is why they do not go through the admin's capitalising getChoicesList.
const choice = (group, value) => ({ value, label: FormTranslations[group][value.toLowerCase()] });

export const GENDER_OPTIONS = [Gender.FEMALE, Gender.MALE].map(value => choice('gender', value));

export const FORMAT_OF_WORK_OPTIONS = [FormatOfWork.ONLINE, FormatOfWork.OFFLINE, FormatOfWork.BOTH].map(value =>
  choice('formatOfWork', value),
);

export const EVENT_FORMAT_OPTIONS = [EventFormat.ONLINE, EventFormat.OFFLINE, EventFormat.ONLINE_OFFLINE].map(value =>
  choice('eventFormat', value),
);

export const OWNERSHIP_OPTIONS = [OwnershipType.PRIVATE, OwnershipType.GOVERNMENT].map(value =>
  choice('ownershipType', value),
);

// The mocks offer only "безкоштовно" and "інше:", where "інше" is where the price goes.
export const EVENT_PRICE_OPTIONS = [
  { value: EventPriceFormat.FREE, label: 'безкоштовно' },
  { value: EventPriceFormat.FIXED_PRICE, label: 'інше:', isOther: true },
];

export const YES_NO_OPTIONS = [
  { value: false, label: 'ні' },
  { value: true, label: 'так' },
];

// The organization form offers a third "інше:" answer for the free-session question.
export const YES_NO_OR_OTHER_OPTIONS = [
  { value: true, label: 'так' },
  { value: false, label: 'ні' },
  { value: 'other', label: 'інше:', isOther: true },
];

// "ні / інше:" questions, where picking "інше" opens a free-text answer.
export const NO_OR_OTHER_OPTIONS = [
  { value: 'no', label: 'ні' },
  { value: 'other', label: 'інше:', isOther: true },
];

export const INCLUSIVE_SPACE_OPTIONS = [
  { value: 'yes', label: 'так' },
  { value: 'no', label: 'ні' },
  { value: 'online', label: 'працюємо виключно онлайн' },
];
