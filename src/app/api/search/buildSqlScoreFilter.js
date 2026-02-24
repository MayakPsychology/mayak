import { Prisma } from '@prisma/client';

export function buildSqlScoreFilter(params) {
  const conditions = [];

  const isFree = params?.isFree === true || params?.isFree === 'true';

  const districts = Array.isArray(params?.districts) ? params.districts.filter(Boolean) : [];

  const specializations = Array.isArray(params?.specializations) ? params.specializations.filter(Boolean) : [];

  // ✅ ACTIVE
  conditions.push(Prisma.sql`
    (
      sp."isActive" = true
      OR
      org."isActive" = true
    )
  `);

  // ✅ FREE
  if (isFree) {
    conditions.push(Prisma.sql`
      (
        sp."isFreeReception" = true
        OR
        org."isFreeReception" = true
      )
    `);
  }

  // ✅ FORMAT (з BOTH)
  if (params?.format) {
    const format = params.format.toUpperCase();

    conditions.push(Prisma.sql`
    (
      sp."formatOfWork" = ${format}::"FormatOfWork"
      OR sp."formatOfWork" = 'BOTH'::"FormatOfWork"
      OR org."formatOfWork" = ${format}::"FormatOfWork"
      OR org."formatOfWork" = 'BOTH'::"FormatOfWork"
    )
  `);
  }
  // ✅ DISTRICTS
  if (districts.length) {
    conditions.push(Prisma.sql`
    (
      EXISTS (
        SELECT 1
        FROM "_AddressToSpecialist" ats
        JOIN "address" a ON a.id = ats."A"
        WHERE ats."B" = sp.id
        AND a."districtId" = ANY(ARRAY[${Prisma.join(districts)}]::uuid[])
      )
      OR
      EXISTS (
        SELECT 1
        FROM "_AddressToOrganization" ato
        JOIN "address" a ON a.id = ato."A"
        WHERE ato."B" = org.id
        AND a."districtId" = ANY(ARRAY[${Prisma.join(districts)}]::uuid[])
      )
    )
  `);
  }

  // ✅ SPECIALIZATIONS
  if (specializations.length) {
    conditions.push(Prisma.sql`
    (
      EXISTS (
        SELECT 1
        FROM "_SpecialistToSpecialization" ss
        WHERE ss."A" = sp.id
        AND ss."B" = ANY(ARRAY[${Prisma.join(specializations)}]::uuid[])
      )
      OR
      EXISTS (
        SELECT 1
        FROM "_OrganizationToSpecialization" os
        WHERE os."A" = org.id
        AND os."B" = ANY(ARRAY[${Prisma.join(specializations)}]::uuid[])
      )
    )
  `);
  }

  if (params.type) {
    conditions.push(Prisma.sql`
    (
      EXISTS (
        SELECT 1
        FROM "support_focus" sf
        JOIN "therapy" t ON t.id = sf."therapyId"
        WHERE sf."specialistId" = sp.id
        AND LOWER(t."type") = LOWER(${params.type})
      )
      OR
      EXISTS (
        SELECT 1
        FROM "support_focus" sf
        JOIN "therapy" t ON t.id = sf."therapyId"
        WHERE sf."organizationId" = org.id
        AND LOWER(t."type") = LOWER(${params.type})
      )
    )
  `);
  }

  if (!conditions.length) return Prisma.empty;

  return Prisma.sql` AND ${Prisma.join(conditions, ' AND ')}`;
}
