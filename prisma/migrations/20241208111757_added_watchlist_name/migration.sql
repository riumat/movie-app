/*
  Warnings:

  - Added the required column `content_name` to the `watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `watchlist` ADD COLUMN `content_name` VARCHAR(191) NOT NULL;
