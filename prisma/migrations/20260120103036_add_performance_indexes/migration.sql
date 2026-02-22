-- CreateIndex
CREATE INDEX "address_districtId_idx" ON "public"."address"("districtId");

-- CreateIndex
CREATE INDEX "address_isPrimary_idx" ON "public"."address"("isPrimary");

-- CreateIndex
CREATE INDEX "address_latitude_longitude_idx" ON "public"."address"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "event_isActive_idx" ON "public"."event"("isActive");

-- CreateIndex
CREATE INDEX "event_eventDate_idx" ON "public"."event"("eventDate");

-- CreateIndex
CREATE INDEX "event_format_idx" ON "public"."event"("format");

-- CreateIndex
CREATE INDEX "organization_isActive_idx" ON "public"."organization"("isActive");

-- CreateIndex
CREATE INDEX "organization_formatOfWork_idx" ON "public"."organization"("formatOfWork");

-- CreateIndex
CREATE INDEX "organization_ownershipType_idx" ON "public"."organization"("ownershipType");

-- CreateIndex
CREATE INDEX "organization_name_idx" ON "public"."organization"("name");

-- CreateIndex
CREATE INDEX "search_entry_sortString_idx" ON "public"."search_entry"("sortString");

-- CreateIndex
CREATE INDEX "search_entry_specialistId_idx" ON "public"."search_entry"("specialistId");

-- CreateIndex
CREATE INDEX "search_entry_organizationId_idx" ON "public"."search_entry"("organizationId");

-- CreateIndex
CREATE INDEX "specialist_isActive_idx" ON "public"."specialist"("isActive");

-- CreateIndex
CREATE INDEX "specialist_formatOfWork_idx" ON "public"."specialist"("formatOfWork");

-- CreateIndex
CREATE INDEX "specialist_gender_idx" ON "public"."specialist"("gender");

-- CreateIndex
CREATE INDEX "specialist_lastName_firstName_idx" ON "public"."specialist"("lastName", "firstName");

-- CreateIndex
CREATE INDEX "support_focus_specialistId_idx" ON "public"."support_focus"("specialistId");

-- CreateIndex
CREATE INDEX "support_focus_organizationId_idx" ON "public"."support_focus"("organizationId");

-- CreateIndex
CREATE INDEX "support_focus_therapyId_idx" ON "public"."support_focus"("therapyId");

-- CreateIndex
CREATE INDEX "support_focus_price_idx" ON "public"."support_focus"("price");

-- CreateIndex
CREATE INDEX "therapy_isActive_idx" ON "public"."therapy"("isActive");

-- CreateIndex
CREATE INDEX "therapy_priority_idx" ON "public"."therapy"("priority");

-- CreateIndex
CREATE INDEX "therapy_type_idx" ON "public"."therapy"("type");
