-- CreateIndex
CREATE INDEX "address_isPrimary_districtId_idx" ON "public"."address"("isPrimary", "districtId");

-- CreateIndex
CREATE INDEX "method_simpleId_idx" ON "public"."method"("simpleId");

-- CreateIndex
CREATE INDEX "request_simpleId_idx" ON "public"."request"("simpleId");

-- CreateIndex
CREATE INDEX "support_focus_specialistId_therapyId_idx" ON "public"."support_focus"("specialistId", "therapyId");

-- CreateIndex
CREATE INDEX "support_focus_organizationId_therapyId_idx" ON "public"."support_focus"("organizationId", "therapyId");
