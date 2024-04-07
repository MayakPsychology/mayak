/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `social_media` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "social_media_title_key" ON "social_media"("title");
