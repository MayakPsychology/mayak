-- AlterTable
ALTER TABLE "public"."_AddressToOrganization" ADD CONSTRAINT "_AddressToOrganization_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_AddressToOrganization_AB_unique";

-- AlterTable
ALTER TABLE "public"."_AddressToSpecialist" ADD CONSTRAINT "_AddressToSpecialist_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_AddressToSpecialist_AB_unique";

-- AlterTable
ALTER TABLE "public"."_EventToEventTag" ADD CONSTRAINT "_EventToEventTag_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_EventToEventTag_AB_unique";

-- AlterTable
ALTER TABLE "public"."_MethodToSpecialist" ADD CONSTRAINT "_MethodToSpecialist_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_MethodToSpecialist_AB_unique";

-- AlterTable
ALTER TABLE "public"."_OrganizationToClientCategoryNotWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryNotWorkingWith_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_OrganizationToClientCategoryNotWorkingWith_AB_unique";

-- AlterTable
ALTER TABLE "public"."_OrganizationToClientCategoryWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryWorkingWith_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_OrganizationToClientCategoryWorkingWith_AB_unique";

-- AlterTable
ALTER TABLE "public"."_OrganizationToOrganizationType" ADD CONSTRAINT "_OrganizationToOrganizationType_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_OrganizationToOrganizationType_AB_unique";

-- AlterTable
ALTER TABLE "public"."_OrganizationToSpecialization" ADD CONSTRAINT "_OrganizationToSpecialization_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_OrganizationToSpecialization_AB_unique";

-- AlterTable
ALTER TABLE "public"."_OrganizationToWorkTime" ADD CONSTRAINT "_OrganizationToWorkTime_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_OrganizationToWorkTime_AB_unique";

-- AlterTable
ALTER TABLE "public"."_RequestToSupportFocus" ADD CONSTRAINT "_RequestToSupportFocus_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_RequestToSupportFocus_AB_unique";

-- AlterTable
ALTER TABLE "public"."_RequestToTherapy" ADD CONSTRAINT "_RequestToTherapy_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_RequestToTherapy_AB_unique";

-- AlterTable
ALTER TABLE "public"."_SpecialistToClientCategoryNotWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryNotWorkingWith_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_SpecialistToClientCategoryNotWorkingWith_AB_unique";

-- AlterTable
ALTER TABLE "public"."_SpecialistToClientCategoryWorkingWith" ADD CONSTRAINT "_SpecialistToClientCategoryWorkingWith_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_SpecialistToClientCategoryWorkingWith_AB_unique";

-- AlterTable
ALTER TABLE "public"."_SpecialistToSpecialization" ADD CONSTRAINT "_SpecialistToSpecialization_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_SpecialistToSpecialization_AB_unique";

-- AlterTable
ALTER TABLE "public"."_SpecialistToWorkTime" ADD CONSTRAINT "_SpecialistToWorkTime_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_SpecialistToWorkTime_AB_unique";

-- AlterTable
ALTER TABLE "public"."specialist" ALTER COLUMN "yearsOfExperience" SET DATA TYPE REAL;
