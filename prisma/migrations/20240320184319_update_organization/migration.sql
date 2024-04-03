-- CreateEnum
CREATE TYPE "OwnershipType" AS ENUM ('PRIVATE', 'GOVERNMENT');

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "isInclusiveSpace" BOOLEAN,
ADD COLUMN     "ownershipType" "OwnershipType";

-- CreateTable
CREATE TABLE "_OrganizationToSpecialization" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToSpecialization_AB_unique" ON "_OrganizationToSpecialization"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToSpecialization_B_index" ON "_OrganizationToSpecialization"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationToSpecialization" ADD CONSTRAINT "_OrganizationToSpecialization_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToSpecialization" ADD CONSTRAINT "_OrganizationToSpecialization_B_fkey" FOREIGN KEY ("B") REFERENCES "specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
