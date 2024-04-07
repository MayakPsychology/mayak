-- CreateEnum
CREATE TYPE "SocialMediaPlatform" AS ENUM ('FACEBOOK', 'TWITTER', 'INSTAGRAM', 'LINKEDIN', 'YOUTUBE', 'TIKTOK', 'WHATSAPP', 'TELEGRAM');

-- CreateTable
CREATE TABLE "social_media" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" "SocialMediaPlatform" NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_media_title_key" ON "social_media"("title");
