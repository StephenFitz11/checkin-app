-- CreateTable
CREATE TABLE "CheckIns" (
    "id" SERIAL NOT NULL,
    "participantId" INTEGER NOT NULL,
    "coralId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckIns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestEntity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckIns" ADD CONSTRAINT "CheckIns_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
