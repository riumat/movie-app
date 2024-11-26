/*
  Warnings:

  - You are about to drop the column `is_watched` on the `Content` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genres` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Content` DROP COLUMN `is_watched`,
    ADD COLUMN `duration` INTEGER NOT NULL,
    ADD COLUMN `genres` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ContentGenre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
