import { PrismaClient } from '@prisma/client';
import {
  districts,
  organizationTypes,
  psychologyMethods,
  psychotherapyMethods,
  requests,
  specializations,
  therapies,
  clientCategories,
  donationDetails,
} from './data.mjs';

const prisma = new PrismaClient();

specializations.push(
  {
    name: 'Психолог',
    methods: {
      connectOrCreate: psychologyMethods.map(method => {
        const { title, description } = method;
        return {
          where: { title },
          create: { title, description },
        };
      }),
    },
  },
  {
    name: 'Психотерапевт',
    methods: {
      connectOrCreate: psychotherapyMethods.map(method => {
        const { title, description } = method;
        return {
          where: { title },
          create: { title, description },
        };
      }),
    },
  },
);

async function createIfNotExist(model, data, filter) {
  // eslint-disable-next-line no-restricted-syntax
  for (const it of data) {
    // eslint-disable-next-line no-await-in-loop
    await model.upsert({ where: filter(it), create: it, update: {} });
  }
}

async function main() {
  await createIfNotExist(prisma.clientCategory, clientCategories, ({ name }) => ({ name }));
  await createIfNotExist(prisma.donationDetails, [donationDetails], ({ title }) => ({ title }));
  await createIfNotExist(prisma.district, districts, ({ name }) => ({ name }));
  await createIfNotExist(prisma.request, requests, ({ name }) => ({ name }));
  await createIfNotExist(prisma.specialization, specializations, ({ name }) => ({ name }));
  await createIfNotExist(prisma.organizationType, organizationTypes, ({ name }) => ({ name }));
  await createIfNotExist(
    prisma.method,
    psychotherapyMethods
      .map(method => ({ ...method, specialization: { connect: { name: 'Психотерапевт' } } }))
      .concat(psychologyMethods.map(method => ({ ...method, specialization: { connect: { name: 'Психолог' } } }))),
    method => ({ title: method.title }),
  );

  // depends on 'requests', they should be created before therapies
  await createIfNotExist(prisma.therapy, therapies, ({ type }) => ({ type }));
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
