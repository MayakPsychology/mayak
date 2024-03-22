import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { getSpecialistFullName } from '../src/utils/getSpecialistFullName.mjs';

function getFullAddress() {
  const street = faker.location.streetAddress();
  const streetNumber = faker.number.int({ min: 1, max: 100 });
  const floor = faker.number.int({ min: 1, max: 100 });
  const room = faker.number.int({ min: 1, max: 100 });
  return `вул. ${street} ${streetNumber}, поверх ${floor}, кабінет ${room}`;
}

function nullable(value) {
  return Date.now() % 2 === 0 ? value : null;
}

// returns array of unique objects with id field
function uniqueObjectsWithId(instances) {
  return faker.helpers
    .uniqueArray(
      instances.map(s => s.id),
      faker.number.int({ min: 1, max: 3 }),
    )
    .map(id => ({ id }));
}

function randomAddress(districts, isPrimary) {
  const randomNameOfClinic = `Клініка ${faker.company.name()}`;
  const randomDistricts = faker.helpers.arrayElement(districts).id; // returns random object from districts array
  return {
    nameOfClinic: randomNameOfClinic,
    fullAddress: getFullAddress(),
    district: {
      connect: {
        id: randomDistricts,
      },
    },
    isPrimary,
  };
}

function generateSocialMediaLinks() {
  const socialMediaList = ['facebook', 'instagram', 'youtube', 'linkedin', 'tiktok', 'viber', 'telegram'];

  return Object.fromEntries(
    socialMediaList
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 5) + 1)
      .map(network => [network, faker.internet.url()]),
  );
}

function randomSpecialist({ districts, specializations, therapies, specializationMethods }) {
  const gender = faker.helpers.arrayElement(['FEMALE', 'MALE']);
  let addresses;
  const formatOfWork = faker.helpers.arrayElement(['BOTH', 'ONLINE', 'OFFLINE']);
  if (formatOfWork !== 'ONLINE') {
    addresses = {
      create: Array(faker.number.int({ min: 1, max: 3 }))
        .fill('')
        .map((_, i) => randomAddress(districts, i === 0)),
    };
  }

  const phoneRegexp = '+380[0-9]{9}';

  const socialMediaLinks = generateSocialMediaLinks();

  const specializationsIds = uniqueObjectsWithId(specializations);
  const specializationMethodsIds = uniqueObjectsWithId(
    specializationMethods.filter(method => specializationsIds.find(s => s.id === method.specializationId)),
  );

  return {
    specializations: {
      connect: specializationsIds,
    },
    specializationMethods: {
      connect: specializationMethodsIds,
    },
    // take name of corresponding gender
    firstName: faker.person.firstName(gender.toLowerCase()),
    lastName: faker.person.lastName(),
    surname: nullable(faker.person.lastName()),
    gender,
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    // take one of these
    formatOfWork,
    addresses,
    therapies: {
      connect: uniqueObjectsWithId(therapies),
    },
    isFreeReception: faker.datatype.boolean(),
    isActive: faker.datatype.boolean(),
    phone: nullable(faker.helpers.fromRegExp(phoneRegexp)),
    email: nullable(faker.internet.email()),
    website: nullable(faker.internet.url()),
    description: faker.lorem.paragraph(),
    ...socialMediaLinks,
  };
}

function randomOrganization({ therapies, districts, organizationTypes }) {
  let addresses;
  const formatOfWork = faker.helpers.arrayElement(['BOTH', 'ONLINE', 'OFFLINE']);
  if (formatOfWork !== 'ONLINE') {
    addresses = {
      create: Array(faker.number.int({ min: 1, max: 3 }))
        .fill('')
        .map((_, i) => randomAddress(districts, i === 0)),
    };
  }
  const phoneRegexp = '+380[0-9]{9}';
  const socialMediaLinks = generateSocialMediaLinks();

  return {
    name: faker.company.name(),
    yearsOnMarket: nullable(faker.number.int({ min: 1, max: 30 })),
    formatOfWork,
    type: {
      connect: uniqueObjectsWithId(organizationTypes),
    },
    addresses,
    therapies: {
      connect: uniqueObjectsWithId(therapies),
    },
    isFreeReception: faker.datatype.boolean(),
    isActive: faker.datatype.boolean(),
    phone: nullable(faker.helpers.fromRegExp(phoneRegexp)),
    email: nullable(faker.internet.email()),
    website: nullable(faker.internet.url()),
    description: faker.lorem.paragraph(),
    ...socialMediaLinks,
  };
}

function randomEvent({ tags, link }) {
  const priceType = faker.helpers.arrayElement(['FREE', 'FIXED_PRICE', 'MIN_PRICE']);
  const format = faker.helpers.arrayElement(['ONLINE', 'OFFLINE']);
  let address;
  let price;
  let locationLink;
  if (format === 'OFFLINE') {
    address = getFullAddress();
    locationLink = faker.helpers.arrayElement([
      'https://maps.app.goo.gl/3YXkdzJnoLwHsXNb7',
      'https://maps.app.goo.gl/coSnsiqkAmGuMgvY9',
      'https://maps.app.goo.gl/AuuirMDJobE7WWKN6',
    ]);
  }
  if (priceType !== 'FREE') {
    price = faker.number.int({ min: 1000, max: 5000 });
  }
  return {
    title: faker.word.noun(),
    organizerName: faker.company.name(),
    address,
    locationLink,
    priceType,
    price,
    format,
    eventDate: Math.random() > 0.5 ? faker.date.future() : faker.date.past(),
    isActive: faker.datatype.boolean(),
    additionalLink: {
      connect: link,
    },
    tags: {
      connect: uniqueObjectsWithId(tags),
    },
  };
}

const prisma = new PrismaClient();

async function main() {
  // Clear the database to make sure we can run seed
  await prisma.$transaction(async trx => {
    await trx.address.deleteMany();
    await trx.specialist.deleteMany();
    await trx.event.deleteMany();
    await trx.eventLink.deleteMany();
    await trx.eventTag.deleteMany();
    await trx.faq.deleteMany();
    await trx.organization.deleteMany();
    await trx.searchEntry.deleteMany();
  });

  const faqs = Array.from({ length: 15 }).map((_, i) => ({
    isActive: faker.datatype.boolean(),
    question: faker.lorem.sentence(),
    answer: faker.lorem.paragraph(),
    priority: i + 10,
  }));

  const eventTags = ['Tag1', 'Tag2', 'Tag3'];

  const eventLink = { label: 'Some site', link: 'https://keenethics.com/' };

  await prisma.eventTag.createMany({
    data: eventTags.map(name => ({ name })),
  });

  await prisma.eventLink.create({ data: eventLink });

  await prisma.faq.createMany({
    data: faqs,
  });

  const therapies = await prisma.therapy.findMany({ select: { id: true } });
  const specializations = await prisma.specialization.findMany({
    select: { id: true },
  });
  const specializationMethods = await prisma.method.findMany();
  const districts = await prisma.district.findMany({ select: { id: true } });

  const tags = await prisma.eventTag.findMany({ select: { id: true } });
  const link = await prisma.eventLink.findFirst({ select: { id: true } });
  const organizationTypes = await prisma.organizationType.findMany({ select: { id: true } });

  // createMany does not support records with relations
  for (let i = 0; i < 10; i += 1) {
    // for instead of Promise.all to avoid overloading the database pool
    const specialistData = randomSpecialist({ districts, specializations, therapies, specializationMethods });
    // eslint-disable-next-line no-await-in-loop
    await prisma.$transaction(async trx => {
      const specialist = await trx.specialist.create({
        data: specialistData,
      });
      await trx.searchEntry.create({
        data: {
          sortString: getSpecialistFullName(specialist),
          specialist: {
            connect: {
              id: specialist.id,
            },
          },
        },
      });
    });
  }
  for (let i = 0; i < 10; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.event.create({
      data: randomEvent({ tags, link }),
    });
  }
  for (let i = 0; i < 10; i += 1) {
    const organizationData = randomOrganization({ therapies, districts, organizationTypes });
    // eslint-disable-next-line no-await-in-loop
    await prisma.$transaction(async trx => {
      const organization = await trx.organization.create({
        data: organizationData,
      });
      await trx.searchEntry.create({
        data: {
          sortString: organization.name,
          organization: {
            connect: {
              id: organization.id,
            },
          },
        },
      });
    });
  }
}

main().then(
  async () => {
    await prisma.$disconnect();
  },
  async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  },
);
