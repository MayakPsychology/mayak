-- CreateEnum
CREATE TYPE "NavigationUrl" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'APPLICATION');

-- CreateTable
CREATE TABLE "social_media" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" "NavigationUrl" NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_media_title_key" ON "social_media"("title");
