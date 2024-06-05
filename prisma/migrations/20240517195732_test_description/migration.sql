/*
  Warnings:

  - Added the required column `description` to the `TestEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestEntity" ADD COLUMN     "description" TEXT NOT NULL;
