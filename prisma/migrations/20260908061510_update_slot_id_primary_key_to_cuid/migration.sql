/*
  Warnings:

  - The primary key for the `slot` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_slotId_fkey";

-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "slotId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "slot" DROP CONSTRAINT "slot_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "slot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "slot_id_seq";

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
