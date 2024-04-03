import { defaultHandler } from 'ra-data-simple-prisma';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { MODEL_INCLUDES, searchInputFilters, transformServiceProvider, withErrorHandlerAndAuth } from '../common';

const handler = withErrorHandlerAndAuth(async req => {
  const json = await req.json();

  const modelName = json.resource.charAt(0).toLowerCase() + json.resource.slice(1);
  const isServiceProvider = modelName === 'specialist' || modelName === 'organization';

  const getOneTransform = instance => {
    transformServiceProvider(instance, modelName);
  };

  const result = await defaultHandler(json, prisma, {
    getList: {
      debug: false,
      where: searchInputFilters(modelName, json.params?.filter?.q),
      include: MODEL_INCLUDES[modelName],
    },
    getOne: {
      debug: false,
      include: MODEL_INCLUDES[modelName],
      transform: isServiceProvider ? getOneTransform : undefined,
    },
    update: {
      debug: false,
      allowJsonUpdate: {
        tags: true,
        additionalLink: true,
        addresses: true,
        districts: true,
        specializations: true,
        specializationMethods: true,
        expertSpecializations: true,
        therapies: true,
        supportFocuses: true,
        requests: true,
        workTime: true,
        type: true,
        clientsWorkingWith: true,
        clientsNotWorkingWith: true,
      },
      include: MODEL_INCLUDES[modelName],
    },
  });

  return NextResponse.json(result);
});

export { handler as GET, handler as POST };
