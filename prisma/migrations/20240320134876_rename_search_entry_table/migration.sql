/*
  Warnings:

  - You are about to drop the `SearchEntry` table. If the table is not empty, all the data it contains will be lost.

*/

-- DropForeignKey
ALTER TABLE "SearchEntry" DROP CONSTRAINT "SearchEntry_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SearchEntry" DROP CONSTRAINT "SearchEntry_specialistId_fkey";

-- DropTable
DROP TABLE "SearchEntry";

-- CreateTable
CREATE TABLE "search_entry" (
    "id" UUID NOT NULL,
    "sortString" TEXT NOT NULL,
    "specialistId" UUID,
    "organizationId" UUID,

    CONSTRAINT "search_entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "search_entry_specialistId_key" ON "search_entry"("specialistId");

-- CreateIndex
CREATE UNIQUE INDEX "search_entry_organizationId_key" ON "search_entry"("organizationId");

-- AddForeignKey
ALTER TABLE "search_entry" ADD CONSTRAINT "search_entry_specialistId_fkey" FOREIGN KEY ("specialistId") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_entry" ADD CONSTRAINT "search_entry_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
