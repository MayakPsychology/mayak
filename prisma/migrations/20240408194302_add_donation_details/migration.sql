/*
  Warnings:

  - Changed the type of `enterpriseRegisterId` on the `donation_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "donation_details" ADD COLUMN     "isQREnabled" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "enterpriseRegisterId",
ADD COLUMN     "enterpriseRegisterId" INTEGER NOT NULL;
