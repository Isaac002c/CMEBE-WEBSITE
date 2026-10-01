-- Partner: campos de perfil da empresa/instituição parceira.
-- IF NOT EXISTS torna a migration segura mesmo se algo já tiver sido aplicado.
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "businessSegment" TEXT;
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "address" TEXT;
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "logoUrl" TEXT;
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "bannerUrl" TEXT;
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "instagram" TEXT;
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "facebook" TEXT;
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "linkedin" TEXT;
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "approvedAt" TIMESTAMP(3);

-- Índice para filtro por segmento (seção de filtros da área pública).
CREATE INDEX IF NOT EXISTS "Partner_businessSegment_idx" ON "Partner"("businessSegment");
