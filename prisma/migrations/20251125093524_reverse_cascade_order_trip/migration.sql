/*
  Warnings:

  - A unique constraint covering the columns `[tripDetailsId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TripDetails" DROP CONSTRAINT "TripDetails_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "tripDetailsId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Order_tripDetailsId_key" ON "Order"("tripDetailsId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tripDetailsId_fkey" FOREIGN KEY ("tripDetailsId") REFERENCES "TripDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
