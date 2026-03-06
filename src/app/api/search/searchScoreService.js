import { prisma } from '@/lib/db';
import { buildSqlScoreFilter } from './buildSqlScoreFilter';

function normalizeSearch(value = '') {
  return value
    .replace(/['`´ʼ’]/g, '’')
    .replace(/[“”«»„‟"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export async function searchScoreService({ terms = [], take = 20, skip = 0, filterParams = {} }) {
  const sqlFilter = buildSqlScoreFilter(filterParams);

  const normalizedTerms = terms
    .map(t => normalizeSearch(t))
    .filter(Boolean)
    .map(t => `%${t}%`);

  if (!normalizedTerms.length) {
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
      FILTER (
        WHERE LOWER(
          REGEXP_REPLACE(r.name, '[\"“”«»„‟]', '', 'g')
        ) LIKE ANY(${normalizedTerms})
      )
      = ${normalizedTerms.length}

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
        FILTER (
          WHERE LOWER(
            REGEXP_REPLACE(r.name, '[\"“”«»„‟]', '', 'g')
          ) LIKE ANY(${normalizedTerms})
        )
        = ${normalizedTerms.length}
    ) t;
  `;

  return {
    ids: rows.map(r => r.id),
    totalCount: total[0]?.count ?? 0,
  };
}
