/*
  Warnings:

  - Added the required column `token` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "token" VARCHAR(255) NOT NULL;
