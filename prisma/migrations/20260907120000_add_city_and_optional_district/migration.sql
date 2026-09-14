-- CreateTable
CREATE TABLE "public"."city" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "city_name_key" ON "public"."city"("name");

-- Every row that exists today is in Lviv; create it so the backfills below have a target.
INSERT INTO "public"."city" ("id", "name") VALUES (gen_random_uuid(), 'Львів');

-- AlterTable: district belongs to a city
ALTER TABLE "public"."district" ADD COLUMN "cityId" UUID;
UPDATE "public"."district" SET "cityId" = (SELECT "id" FROM "public"."city" WHERE "name" = 'Львів');
ALTER TABLE "public"."district" ALTER COLUMN "cityId" SET NOT NULL;

DROP INDEX IF EXISTS "public"."district_name_key";
CREATE UNIQUE INDEX "district_name_cityId_key" ON "public"."district"("name", "cityId");
CREATE INDEX "district_cityId_idx" ON "public"."district"("cityId");

ALTER TABLE "public"."district" ADD CONSTRAINT "district_cityId_fkey"
    FOREIGN KEY ("cityId") REFERENCES "public"."city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable: address carries the city directly; the district becomes optional
ALTER TABLE "public"."address" ADD COLUMN "cityId" UUID;
UPDATE "public"."address" a SET "cityId" = d."cityId"
    FROM "public"."district" d WHERE d."id" = a."districtId";
ALTER TABLE "public"."address" ALTER COLUMN "cityId" SET NOT NULL;
ALTER TABLE "public"."address" ALTER COLUMN "districtId" DROP NOT NULL;

CREATE INDEX "address_cityId_idx" ON "public"."address"("cityId");

ALTER TABLE "public"."address" ADD CONSTRAINT "address_cityId_fkey"
    FOREIGN KEY ("cityId") REFERENCES "public"."city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
