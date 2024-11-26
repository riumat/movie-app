/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContentGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Watchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Content` DROP FOREIGN KEY `Content_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Person` DROP FOREIGN KEY `Person_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Watchlist` DROP FOREIGN KEY `Watchlist_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_relationships` DROP FOREIGN KEY `user_relationships_receiver_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_relationships` DROP FOREIGN KEY `user_relationships_requester_id_fkey`;

-- DropTable
DROP TABLE `Content`;

-- DropTable
DROP TABLE `ContentGenre`;

-- DropTable
DROP TABLE `Person`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `Watchlist`;

-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content` (
    `user_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `content_type` ENUM('movie', 'tv') NOT NULL,
    `rating` INTEGER NULL,
    `review` VARCHAR(400) NULL,
    `duration` INTEGER NOT NULL,
    `genres` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `content_id`, `content_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `watchlist` (
    `user_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `content_type` ENUM('movie', 'tv') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_id`, `content_id`, `content_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `person` (
    `person_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `watchlist` ADD CONSTRAINT `watchlist_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `person_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_relationships` ADD CONSTRAINT `user_relationships_requester_id_fkey` FOREIGN KEY (`requester_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_relationships` ADD CONSTRAINT `user_relationships_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
