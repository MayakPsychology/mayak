-- DropForeignKey
ALTER TABLE "public"."address" DROP CONSTRAINT "address_districtId_fkey";

-- CreateTable
CREATE TABLE "public"."rate_limit_hit" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" VARCHAR(128) NOT NULL,

    CONSTRAINT "rate_limit_hit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rate_limit_hit_key_createdAt_idx" ON "public"."rate_limit_hit"("key", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."address" ADD CONSTRAINT "address_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "public"."district"("id") ON DELETE SET NULL ON UPDATE CASCADE;
