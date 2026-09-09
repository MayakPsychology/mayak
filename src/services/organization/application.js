import { transformOrganizationData } from '@/app/(admin)/admin/_utils/transformOrganizationData';
import { normalizeForPrisma } from '@/app/_utils/normalizeForPrisma';
import { prisma } from '@/lib/db';
import { EMAIL_TYPES } from '@/app/config/emails';
import { organizationApplicationFullSchema } from '@/lib/validationSchemas/applications/organizationApplicationSchema';
import { sendApplicationNotification } from '../email/sendEmail';

function toDbInput(data) {
  return {
    name: data.name,
    type: data.type,
    ownershipType: data.ownershipType,
    yearsOnMarket: data.yearsOnMarket,
    yearsOfExperience: data.yearsOfExperience,
    experience: data.experience,
    // the mocks' third answer, "працюємо виключно онлайн", is not an inclusive physical space
    isInclusiveSpace: data.isInclusiveSpace === 'yes',
    formatOfWork: data.formatOfWork,

    phone: data.phone,
    email: data.email,
    website: data.website,
    description: data.description,
    // "інше:" means free sessions do exist, with the details spelled out for the admins
    isFreeReception: data.isFreeReception === 'other' ? true : data.isFreeReception,

    addresses: data.addresses,
    workTime: data.workTime,
    supportFocuses: data.supportFocuses,
    expertSpecializations: data.expertSpecializations,

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

export async function application(rawData, attachments) {
  const data = organizationApplicationFullSchema.parse(rawData);
  const transformedData = transformOrganizationData(normalizeForPrisma(toDbInput(data)));

  const organization = await prisma.organization.create({ data: transformedData });

  const notification = await sendApplicationNotification({
    data,
    type: EMAIL_TYPES.ORGANIZATION_APPLICATION,
    subjectDetails: data.name,
    attachments,
  });

  return { id: organization.id, notification };
}
