-- 20260907120000_add_city_and_optional_district made address.districtId nullable but left the
-- foreign key it was created with, so deleting a district still failed instead of clearing the
-- column. Re-created here idempotently: 20260909103602 already carries the same statements for
-- databases that have run it.
ALTER TABLE "public"."address" DROP CONSTRAINT IF EXISTS "address_districtId_fkey";

ALTER TABLE "public"."address" ADD CONSTRAINT "address_districtId_fkey"
    FOREIGN KEY ("districtId") REFERENCES "public"."district"("id") ON DELETE SET NULL ON UPDATE CASCADE;
