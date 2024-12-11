/*
  Warnings:

  - The primary key for the `content_to_genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `content_to_genre` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content_to_genre` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `content_to_genre_user_id_genre_id_idx` ON `content_to_genre`(`user_id`, `genre_id`);

-- CreateIndex
CREATE INDEX `content_to_genre_content_id_content_type_idx` ON `content_to_genre`(`content_id`, `content_type`);

-- AddForeignKey
ALTER TABLE `content_to_genre` ADD CONSTRAINT `content_to_genre_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
