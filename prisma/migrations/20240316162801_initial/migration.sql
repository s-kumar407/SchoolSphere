/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Schools` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `schools` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    ADD COLUMN `schoolId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Schools_userId_key` ON `Schools`(`userId`);

-- AddForeignKey
ALTER TABLE `Schools` ADD CONSTRAINT `Schools_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
