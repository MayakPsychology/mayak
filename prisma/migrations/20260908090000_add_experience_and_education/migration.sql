-- AlterTable: free-text "Досвід" and "Освіта" from the specialist application form
ALTER TABLE "public"."specialist" ADD COLUMN     "experience" TEXT,
                                  ADD COLUMN     "education" TEXT;

-- AlterTable: free-text "Ваш досвід та спеціалізація" from the organization application form
ALTER TABLE "public"."organization" ADD COLUMN     "experience" TEXT;
