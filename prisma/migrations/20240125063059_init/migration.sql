-- AlterTable
ALTER TABLE `moneys` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `verify` ALTER COLUMN `updatedAt` DROP DEFAULT;
