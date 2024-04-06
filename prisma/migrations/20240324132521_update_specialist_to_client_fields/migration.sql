/*
  Warnings:

  - You are about to drop the `_SpecialistDoesNotWorkWithClientCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SpecialistWorksWithClientCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SpecialistDoesNotWorkWithClientCategories" DROP CONSTRAINT "_SpecialistDoesNotWorkWithClientCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistDoesNotWorkWithClientCategories" DROP CONSTRAINT "_SpecialistDoesNotWorkWithClientCategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistWorksWithClientCategories" DROP CONSTRAINT "_SpecialistWorksWithClientCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistWorksWithClientCategories" DROP CONSTRAINT "_SpecialistWorksWithClientCategories_B_fkey";

-- DropTable
DROP TABLE "_SpecialistDoesNotWorkWithClientCategories";

-- DropTable
DROP TABLE "_SpecialistWorksWithClientCategories";

-- CreateTable
CREATE TABLE "_SpecialistToClientCategoryWorkingWith" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialistToClientCategoryNotWorkingWith" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToClientCategoryWorkingWith_AB_unique" ON "_SpecialistToClientCategoryWorkingWith"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToClientCategoryWorkingWith_B_index" ON "_SpecialistToClientCategoryWorkingWith"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToClientCategoryNotWorkingWith_AB_unique" ON "_SpecialistToClientCategoryNotWorkingWith"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToClientCategoryNotWorkingWith_B_index" ON "_SpecialistToClientCategoryNotWorkingWith"("B");

-- AddForeignKey
ALTER TABLE "_SpecialistToClientCategoryWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryWorkingWith_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToClientCategoryWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryWorkingWith_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToClientCategoryNotWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryNotWorkingWith_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToClientCategoryNotWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryNotWorkingWith_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
