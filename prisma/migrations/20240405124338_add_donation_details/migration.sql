-- CreateTable
CREATE TABLE "donation_details" (
    "id" UUID NOT NULL,
    "donationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR(50) NOT NULL,
    "subtitle" VARCHAR(50) NOT NULL,
    "subtitleEnabled" BOOLEAN NOT NULL DEFAULT true,
    "paypalLink" TEXT NOT NULL,
    "paypalLinkEnabled" BOOLEAN NOT NULL DEFAULT true,
    "privatLink" TEXT NOT NULL,
    "privatLinkEnabled" BOOLEAN NOT NULL DEFAULT true,
    "bankDetailsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "enterpriceName" VARCHAR(128) NOT NULL,
    "enterpriseRegisterId" VARCHAR(20) NOT NULL,
    "paymentPurpose" VARCHAR(50) NOT NULL,
    "iban" VARCHAR(50) NOT NULL,
    "qrLink" TEXT NOT NULL,

    CONSTRAINT "donation_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "donation_details_title_key" ON "donation_details"("title");
