/* eslint-disable no-console */
// const { prisma } = require('@/lib/db');

import { normalizeForPrisma } from '@/app/_utils/normalizeForPrisma';

function formDataToObject(formData) {
  const data = {};

  formData.forEach((value, key) => {
    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value;
    }
  });

  return data;
}

export async function application(formData) {
  // 1️⃣ FormData → объект
  const data = formDataToObject(formData);

  console.log('RAW DATA FROM FORM:', data);
  // 1. Email — вфдпавка вчіх даних на електронну пошту
  //   await sendSpecialistSubmissionEmail(formData);

  // 2. Відбираємо дані (поля) тільки для БД
  const dbInput = {
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    yearsOfExperience: data.yearsOfExperience,
    formatOfWork: data.formatOfWork,

    phone: data.phone,
    email: data.email,
    description: data.description,
    isFreeReception: data.isFreeReception,

    addresses: data.addresses,
    workTime: data.workTime,

    supportFocuses: data.supportFocuses,

    specializations: data.specializations,
    specializationMethods: data.specializationMethods,

    clients: {
      workingWith: data.clients?.workingWith,
      notWorkingWith: data.clients?.notWorkingWith,
    },

    // socialLink → поля Specialist
    instagram: data.socialLink?.instagram,
    facebook: data.socialLink?.facebook,
    youtube: data.socialLink?.youtube,
    linkedin: data.socialLink?.linkedin,
    tiktok: data.socialLink?.tiktok,
    viber: data.socialLink?.viber,
    telegram: data.socialLink?.telegram,

    // бизнес-правило
    isActive: false,
  };
  console.log('DB fields (before normalize):', dbInput);

  // 3. Нормалізація

  const normalizedData = normalizeForPrisma(dbInput);

  console.log('DB fields (normalized):', normalizedData);

  // 4. Трфнсформація под структурру призма

  // 5️⃣ create через extension
  // await prisma.specialist.create({ data: prismaData });
}
