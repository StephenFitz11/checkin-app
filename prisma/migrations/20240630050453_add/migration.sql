-- CreateTable
CREATE TABLE "Parade" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "status" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Parade_pkey" PRIMARY KEY ("id")
);
