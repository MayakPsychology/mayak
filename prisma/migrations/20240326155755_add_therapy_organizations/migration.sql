-- CreateTable
CREATE TABLE "_OrganizationToTherapy" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToTherapy_AB_unique" ON "_OrganizationToTherapy"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToTherapy_B_index" ON "_OrganizationToTherapy"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapy" ADD CONSTRAINT "_OrganizationToTherapy_A_fkey" FOREIGN KEY ("A") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToTherapy" ADD CONSTRAINT "_OrganizationToTherapy_B_fkey" FOREIGN KEY ("B") REFERENCES "therapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
