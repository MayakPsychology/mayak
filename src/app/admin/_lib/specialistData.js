export const SpecialistFormFields = {
  lastName: {
    name: 'lastName',
    type: 'text',
    label: 'Прізвище',
    isRequired: true,
  },
  firstName: {
    name: 'firstName',
    type: 'text',
    label: "Ім'я",
    isRequired: true,
  },
  surname: {
    name: 'surname',
    type: 'text',
    label: 'По-батькові',
    isRequired: false,
  },
  specializations: {
    name: 'specializations',
    type: 'text',
    label: 'Спеціалізація',
    isRequired: true,
  },
  gender: {
    name: 'gender',
    type: 'text',
    label: 'Стать',
    isRequired: true,
  },
  yearsOfExperience: {
    name: 'yearsOfExperience',
    type: 'text',
    label: 'Роки стажу',
    isRequired: false,
  },
  formatOfWork: {
    name: 'formatOfWork',
    type: 'text',
    label: 'Формат послуг',
    isRequired: true,
  },
  placesOfWork: {
    name: 'placesOfWork',
    type: null,
    label: 'Адреса',
    isRequired: true,
  },
  fullAddress: {
    name: 'fullAddress',
    type: 'text',
    label: 'Повна адреса',
    isRequired: true,
  },
  nameOfClinic: {
    name: 'nameOfClinic',
    type: 'text',
    label: 'Назва клініки',
    isRequired: false,
  },
  district: {
    name: 'district',
    type: null,
    label: 'Район',
    isRequired: true,
  },
  therapies: {
    name: 'therapies',
    type: null,
    label: 'Тип терапії',
    isRequired: true,
  },
  isFreeReception: {
    name: 'isFreeReception',
    type: 'checkbox',
    label: 'Безкоштовний прийом',
    isRequired: false,
  },
  description: {
    name: 'description',
    type: 'text',
    label: 'Опис',
    isRequired: false,
  },
  phone: {
    name: 'phone',
    type: 'tel',
    label: 'Телефон',
    isRequired: false,
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Пошта',
    isRequired: false,
  },
  website: {
    name: 'website',
    type: 'url',
    label: 'Веб сторінка',
    isRequired: false,
  },
};

export const SpecialistFormSections = {
  general: 'Основні дані',
  details: 'Деталі',
  placesOfWork: 'Місце надання послуг',
  services: 'Послуги',
  contacts: 'Контактні дані',
};
