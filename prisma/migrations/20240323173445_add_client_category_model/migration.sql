-- CreateTable
CREATE TABLE "client_category" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "client_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpecialistWorksWithClientCategories" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialistDoesNotWorkWithClientCategories" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "client_category_name_key" ON "client_category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistWorksWithClientCategories_AB_unique" ON "_SpecialistWorksWithClientCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistWorksWithClientCategories_B_index" ON "_SpecialistWorksWithClientCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialistDoesNotWorkWithClientCategories_AB_unique" ON "_SpecialistDoesNotWorkWithClientCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialistDoesNotWorkWithClientCategories_B_index" ON "_SpecialistDoesNotWorkWithClientCategories"("B");

-- AddForeignKey
ALTER TABLE "_SpecialistWorksWithClientCategories" ADD CONSTRAINT "_SpecialistWorksWithClientCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistWorksWithClientCategories" ADD CONSTRAINT "_SpecialistWorksWithClientCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistDoesNotWorkWithClientCategories" ADD CONSTRAINT "_SpecialistDoesNotWorkWithClientCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialistDoesNotWorkWithClientCategories" ADD CONSTRAINT "_SpecialistDoesNotWorkWithClientCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
