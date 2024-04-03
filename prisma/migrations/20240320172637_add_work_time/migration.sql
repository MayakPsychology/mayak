-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateTable
CREATE TABLE "work_time" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" VARCHAR(13) NOT NULL,
    "isDayOff" BOOLEAN NOT NULL DEFAULT false,
    "weekDay" "WeekDay" NOT NULL,

    CONSTRAINT "work_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpecialistToWorkTime" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToWorkTime" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "work_time_weekDay_time_isDayOff_key" ON "work_time"("weekDay", "time", "isDayOff");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistToWorkTime_AB_unique" ON "_SpecialistToWorkTime"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistToWorkTime_B_index" ON "_SpecialistToWorkTime"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToWorkTime_AB_unique" ON "_OrganizationToWorkTime"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToWorkTime_B_index" ON "_OrganizationToWorkTime"("B");

-- AddForeignKey
ALTER TABLE "_SpecialistToWorkTime" ADD CONSTRAINT "_SpecialistToWorkTime_A_fkey" FOREIGN KEY ("A") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistToWorkTime" ADD CONSTRAINT "_SpecialistToWorkTime_B_fkey" FOREIGN KEY ("B") REFERENCES "work_time"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToWorkTime" ADD CONSTRAINT "_OrganizationToWorkTime_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToWorkTime" ADD CONSTRAINT "_OrganizationToWorkTime_B_fkey" FOREIGN KEY ("B") REFERENCES "work_time"("id") ON DELETE CASCADE ON UPDATE CASCADE;
