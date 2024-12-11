-- AlterTable
ALTER TABLE `user` ADD COLUMN `watchtime` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `content_to_genre` (
    `user_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `content_type` ENUM('movie', 'tv') NOT NULL,
    `genre_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`content_id`, `genre_id`, `content_type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `content_to_genre` ADD CONSTRAINT `content_to_genre_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `content_genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `content_to_genre` ADD CONSTRAINT `content_to_genre_user_id_content_id_content_type_fkey` FOREIGN KEY (`user_id`, `content_id`, `content_type`) REFERENCES `content`(`user_id`, `content_id`, `content_type`) ON DELETE RESTRICT ON UPDATE CASCADE;
