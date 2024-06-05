/*
  Warnings:

  - You are about to drop the column `status` on the `TestEntity` table. All the data in the column will be lost.
  - Added the required column `checkin` to the `TestEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestEntity" DROP COLUMN "status",
ADD COLUMN     "checkin" BOOLEAN NOT NULL;
