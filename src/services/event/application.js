import { EventFormat, EventPriceFormat } from '@prisma/client';
import { transformEventCreateData } from '@/app/(admin)/admin/_utils/transformEventCreateData';
import { prisma } from '@/lib/db';
import { EMAIL_TYPES } from '@/app/config/emails';
import { eventApplicationSchema } from '@/lib/validationSchemas/applications/eventApplicationSchema';
import { sendApplicationNotification } from '../email/sendEmail';

const LINK_LABEL = 'Посилання на подію';

function toDbInput(data) {
  return {
    title: data.title,
    organizerName: data.organizerName,
    eventDate: data.eventDate,
    format: data.format,
    priceType: data.priceType,
    price: data.priceType === EventPriceFormat.FREE ? null : data.price,
    address: data.format === EventFormat.ONLINE ? null : (data.address ?? null),
    locationLink: null,
    notes: data.notes,
    additionalLink: { label: LINK_LABEL, link: data.link },
    isActive: false,
  };
}

export async function application(rawData) {
  const data = eventApplicationSchema.parse(rawData);
  const transformedData = transformEventCreateData(toDbInput(data));

  const event = await prisma.event.create({ data: transformedData });

  const notification = await sendApplicationNotification({
    data: { ...data, additionalLink: { label: LINK_LABEL, link: data.link } },
    type: EMAIL_TYPES.EVENT_APPLICATION,
    subjectDetails: data.title,
  });

  return { id: event.id, notification };
}
