-- CreateTable
CREATE TABLE "_OrganizationToClientCategoryWorkingWith" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_OrganizationToClientCategoryNotWorkingWith" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToClientCategoryWorkingWith_AB_unique" ON "_OrganizationToClientCategoryWorkingWith"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToClientCategoryWorkingWith_B_index" ON "_OrganizationToClientCategoryWorkingWith"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToClientCategoryNotWorkingWith_AB_unique" ON "_OrganizationToClientCategoryNotWorkingWith"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToClientCategoryNotWorkingWith_B_index" ON "_OrganizationToClientCategoryNotWorkingWith"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationToClientCategoryWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryWorkingWith_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToClientCategoryWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryWorkingWith_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToClientCategoryNotWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryNotWorkingWith_A_fkey" FOREIGN KEY ("A") REFERENCES "client_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToClientCategoryNotWorkingWith" ADD CONSTRAINT "_OrganizationToClientCategoryNotWorkingWith_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
