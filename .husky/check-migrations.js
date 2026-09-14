const { spawnSync } = require('child_process');

const prisma = args => {
  const result = spawnSync('npx', ['prisma', ...args], { encoding: 'utf8' });
  return { ...result, output: `${result.stdout ?? ''}${result.stderr ?? ''}` };
};

const NO_DATABASE = /P1000|P1001|P1003|P1012|ECONNREFUSED|Can't reach database|Environment variable not found/;

const status = prisma(['migrate', 'status']);

if (NO_DATABASE.test(status.output)) {
  console.log('⚠️  No database reachable, skipping the migration check.');
  process.exit(0);
}

if (status.status !== 0) {
  console.log(status.output.trim());
  console.log('\n❌ Your database is behind prisma/migrations. Run "npm run migrations", then commit again.');
  process.exit(1);
}

const diff = prisma([
  'migrate',
  'diff',
  '--from-schema-datasource',
  'prisma/schema.prisma',
  '--to-schema-datamodel',
  'prisma/schema.prisma',
  '--script',
  '--exit-code',
]);

if (diff.status === 2) {
  console.log(diff.stdout.trim());
  console.log('\n❌ prisma/migrations does not add up to prisma/schema.prisma — the SQL above is still missing.');
  console.log('   Add it to your migration by hand, or let Prisma write one with "npm run migrations".');
  process.exit(1);
}

if (diff.status !== 0) {
  console.log(diff.output.trim());
  console.log('\n❌ Could not compare prisma/migrations with prisma/schema.prisma.');
  process.exit(1);
}

console.log('✅ prisma/migrations matches prisma/schema.prisma');
