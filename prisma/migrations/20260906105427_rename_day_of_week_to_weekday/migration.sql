/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `availability_rules` table. All the data in the column will be lost.
  - Added the required column `weekday` to the `availability_rules` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "availability_rules_userId_dayOfWeek_idx";

-- AlterTable
ALTER TABLE "availability_exceptions" ADD COLUMN     "availabilityRuleId" INTEGER;

-- AlterTable
ALTER TABLE "availability_rules" DROP COLUMN "dayOfWeek",
ADD COLUMN     "weekday" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "availability_rules_userId_weekday_idx" ON "availability_rules"("userId", "weekday");

-- AddForeignKey
ALTER TABLE "availability_exceptions" ADD CONSTRAINT "availability_exceptions_availabilityRuleId_fkey" FOREIGN KEY ("availabilityRuleId") REFERENCES "availability_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;
