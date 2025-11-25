/*
  Warnings:

  - You are about to drop the column `orderId` on the `TripDetails` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TripDetails_orderId_key";

-- AlterTable
ALTER TABLE "TripDetails" DROP COLUMN "orderId";
