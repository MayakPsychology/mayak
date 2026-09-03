import { transformSpecialistData } from '@/app/(admin)/admin/_utils/transformSpecialistData';
import { normalizeForPrisma } from '@/app/_utils/normalizeForPrisma';
import { prisma } from '@/lib/db';
import { EMAIL_TYPES } from '@/app/config/emails';
import { specialistApplicationFullSchema } from '@/lib/validationSchemas/applications/specialistApplicationSchema';
import { sendApplicationNotification } from '../email/sendEmail';

function toDbInput(data) {
  return {
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

    instagram: data.socialLink?.instagram,
    facebook: data.socialLink?.facebook,
    youtube: data.socialLink?.youtube,
    linkedin: data.socialLink?.linkedin,
    tiktok: data.socialLink?.tiktok,
    viber: data.socialLink?.viber,
    telegram: data.socialLink?.telegram,

    isActive: false,
  };
}

export async function application(rawData) {
  const data = specialistApplicationFullSchema.parse(rawData);
  const transformedData = transformSpecialistData(normalizeForPrisma(toDbInput(data)));

  const specialist = await prisma.specialist.create({ data: transformedData });

  const notification = await sendApplicationNotification({
    data,
    type: EMAIL_TYPES.SPECIALIST_APPLICATION,
    subjectDetails: `${data.lastName} ${data.firstName}`,
  });

  return { id: specialist.id, notification };
}
