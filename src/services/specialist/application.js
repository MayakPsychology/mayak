/* eslint-disable no-console */
import { transformSpecialistData } from '@/app/(admin)/admin/_utils/transformSpecialistData';
import { normalizeForPrisma } from '@/app/_utils/normalizeForPrisma';
import { prisma } from '@/lib/db';
import { sendApplicationNotification } from '../email/sendEmail';

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

  console.log('Recived from frontend:', data);
  // 1. Email — вфдпhавка даних на електронну пошту
  // TODO: винести в орему утиліту
  // 2. Відбираємо дані (поля) тільки для БД
  const dbInput = {
    firstName: data.firstName,
    lastName: data.lastName,
    surname: data.surname,
    gender: data.gender,
    yearsOfExperience: data.yearsOfExperience,
    formatOfWork: data.formatOfWork,

    phone: data.phone,
    email: data.email,
    website: data.website,
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

  // 3. Нормалізація
  const normalizedData = normalizeForPrisma(dbInput);

  console.log('NORMALIZED DATA', normalizedData);

  // 4. Трфнсформація под структурру призма
  const transformedData = transformSpecialistData(normalizedData);
  console.log('TRANSFORMED DATA:', transformedData);

  // 5️. стоврення спеціаліста в базі через prisma extension
  await prisma.specialist.create({ data: transformedData });
  const result = await sendApplicationNotification(data);
  console.log(result);
}

// TODO: поодумати про безпеку (ін'єкції і т.ін)
// TODO: додати на фронт капчу
