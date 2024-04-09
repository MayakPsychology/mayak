-- CreateTable
CREATE TABLE "donation_details" (
    "id" UUID NOT NULL,
    "isDonationEnabled" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR(50) NOT NULL,
    "subtitle" VARCHAR(50) NOT NULL,
    "isSubtitleEnabled" BOOLEAN NOT NULL DEFAULT true,
    "paypalLink" TEXT NOT NULL,
    "isPayPalLinkEnabled" BOOLEAN NOT NULL DEFAULT true,
    "privatLink" TEXT NOT NULL,
    "isPrivatLinkEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isBankDetailsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "enterpriceName" VARCHAR(128) NOT NULL,
    "enterpriseRegisterId" VARCHAR(20) NOT NULL,
    "paymentPurpose" VARCHAR(50) NOT NULL,
    "iban" VARCHAR(50) NOT NULL,
    "qrLink" TEXT NOT NULL,

    CONSTRAINT "donation_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "donation_details_title_key" ON "donation_details"("title");
