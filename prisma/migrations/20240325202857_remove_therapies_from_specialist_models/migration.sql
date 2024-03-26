/*
  Warnings:

  - You are about to drop the `_OrganizationToTherapy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SpecialistToTherapy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToTherapy" DROP CONSTRAINT "_OrganizationToTherapy_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToTherapy" DROP CONSTRAINT "_OrganizationToTherapy_B_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistToTherapy" DROP CONSTRAINT "_SpecialistToTherapy_A_fkey";

-- DropForeignKey
ALTER TABLE "_SpecialistToTherapy" DROP CONSTRAINT "_SpecialistToTherapy_B_fkey";

-- DropTable
DROP TABLE "_OrganizationToTherapy";

-- DropTable
DROP TABLE "_SpecialistToTherapy";
