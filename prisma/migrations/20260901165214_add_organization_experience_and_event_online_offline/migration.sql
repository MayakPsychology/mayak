-- AlterEnum
ALTER TYPE "public"."EventFormat" ADD VALUE 'ONLINE_OFFLINE';

-- AlterTable
ALTER TABLE "public"."organization" ADD COLUMN     "yearsOfExperience" SMALLINT;
