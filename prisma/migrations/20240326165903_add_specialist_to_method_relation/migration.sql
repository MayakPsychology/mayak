-- CreateTable
CREATE TABLE "_MethodToSpecialist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MethodToSpecialist_AB_unique" ON "_MethodToSpecialist"("A", "B");

-- CreateIndex
CREATE INDEX "_MethodToSpecialist_B_index" ON "_MethodToSpecialist"("B");

-- AddForeignKey
ALTER TABLE "_MethodToSpecialist" ADD CONSTRAINT "_MethodToSpecialist_A_fkey" FOREIGN KEY ("A") REFERENCES "method"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MethodToSpecialist" ADD CONSTRAINT "_MethodToSpecialist_B_fkey" FOREIGN KEY ("B") REFERENCES "specialist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
