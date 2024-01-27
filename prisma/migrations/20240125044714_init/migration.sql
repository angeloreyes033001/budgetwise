-- CreateTable
CREATE TABLE `moneys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `money` DOUBLE NOT NULL DEFAULT 0.0,
    `userID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `moneys` ADD CONSTRAINT `moneys_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;