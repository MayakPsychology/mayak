import { prisma } from '@/lib/db';
import { buildSqlScoreFilter } from './buildSqlScoreFilter';

export async function searchScoreService({ terms = [], take = 20, skip = 0, filterParams = {} }) {
  const sqlFilter = buildSqlScoreFilter(filterParams);

  // 🔹 якщо без тегів
  if (!terms.length) {
    const rows = await prisma.$queryRaw`
      SELECT se.id
      FROM "search_entry" se
      LEFT JOIN "specialist" sp ON sp.id = se."specialistId"
      LEFT JOIN "organization" org ON org.id = se."organizationId"
      WHERE 1=1
      ${sqlFilter}
      ORDER BY se.id
      LIMIT ${take}
      OFFSET ${skip};
    `;

    const total = await prisma.$queryRaw`
      SELECT COUNT(*)::int AS count
      FROM "search_entry" se
      LEFT JOIN "specialist" sp ON sp.id = se."specialistId"
      LEFT JOIN "organization" org ON org.id = se."organizationId"
      WHERE 1=1
      ${sqlFilter};
    `;

    return {
      ids: rows.map(r => r.id),
      totalCount: total[0]?.count ?? 0,
    };
  }

  // 🔥 MULTI TAG AND
  const rows = await prisma.$queryRaw`
    SELECT se.id
    FROM "search_entry" se
    LEFT JOIN "specialist" sp ON sp.id = se."specialistId"
    LEFT JOIN "organization" org ON org.id = se."organizationId"
    LEFT JOIN "support_focus" sf
      ON (
        (sf."specialistId" = sp.id AND sp.id IS NOT NULL)
        OR
        (sf."organizationId" = org.id AND org.id IS NOT NULL)
      )
    LEFT JOIN "_RequestToSupportFocus" rsf ON rsf."B" = sf.id
    LEFT JOIN "request" r ON r.id = rsf."A"

    WHERE 1=1
    ${sqlFilter}

    GROUP BY se.id

    HAVING
      COUNT(DISTINCT r.name)
      FILTER (WHERE r.name = ANY(${terms}))
      = ${terms.length}

    ORDER BY se.id
    LIMIT ${take}
    OFFSET ${skip};
  `;

  const total = await prisma.$queryRaw`
    SELECT COUNT(*)::int AS count
    FROM (
      SELECT se.id
      FROM "search_entry" se
      LEFT JOIN "specialist" sp ON sp.id = se."specialistId"
      LEFT JOIN "organization" org ON org.id = se."organizationId"
      LEFT JOIN "support_focus" sf
        ON (
          (sf."specialistId" = sp.id AND sp.id IS NOT NULL)
          OR
          (sf."organizationId" = org.id AND org.id IS NOT NULL)
        )
      LEFT JOIN "_RequestToSupportFocus" rsf ON rsf."B" = sf.id
      LEFT JOIN "request" r ON r.id = rsf."A"

      WHERE 1=1
      ${sqlFilter}

      GROUP BY se.id

      HAVING
        COUNT(DISTINCT r.name)
        FILTER (WHERE r.name = ANY(${terms}))
        = ${terms.length}
    ) t;
  `;

  return {
    ids: rows.map(r => r.id),
    totalCount: total[0]?.count ?? 0,
  };
}
