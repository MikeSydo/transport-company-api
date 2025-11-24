-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "route" TEXT NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
