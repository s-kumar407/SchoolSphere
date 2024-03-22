/*
  Warnings:

  - Made the column `userId` on table `schools` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `schools` DROP FOREIGN KEY `Schools_userId_fkey`;

-- AlterTable
ALTER TABLE `schools` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Schools` ADD CONSTRAINT `Schools_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
