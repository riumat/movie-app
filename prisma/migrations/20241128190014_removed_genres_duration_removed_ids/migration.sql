/*
  Warnings:

  - You are about to drop the column `duration` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `content` table. All the data in the column will be lost.
  - The primary key for the `person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `person` table. All the data in the column will be lost.
  - You are about to drop the `user_relationships` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_relationships` DROP FOREIGN KEY `user_relationships_receiver_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_relationships` DROP FOREIGN KEY `user_relationships_requester_id_fkey`;

-- AlterTable
ALTER TABLE `content` DROP COLUMN `duration`,
    DROP COLUMN `genres`;

-- AlterTable
ALTER TABLE `content_genre` MODIFY `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `person` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`person_id`, `user_id`);

-- DropTable
DROP TABLE `user_relationships`;

-- CreateTable
CREATE TABLE `relationships` (
    `requester_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected') NOT NULL,
    `requested_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `responded_at` DATETIME(3) NULL,

    PRIMARY KEY (`requester_id`, `receiver_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `relationships` ADD CONSTRAINT `relationships_requester_id_fkey` FOREIGN KEY (`requester_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationships` ADD CONSTRAINT `relationships_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
