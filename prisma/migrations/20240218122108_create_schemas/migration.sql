-- CreateTable
CREATE TABLE `schools` (
    `schoolId` INTEGER NOT NULL AUTO_INCREMENT,
    `schoolName` VARCHAR(30) NULL,
    `schoolAddress` VARCHAR(50) NULL,
    `schoolCity` VARCHAR(30) NULL,
    `schoolState` VARCHAR(30) NULL,
    `contactNo` VARCHAR(30) NULL,
    `schoolEmail` VARCHAR(50) NULL,
    `image` TEXT NULL,

    PRIMARY KEY (`schoolId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NULL,
    `email` VARCHAR(50) NULL,
    `name` VARCHAR(30) NULL,
    `contactNo` VARCHAR(30) NULL,
    `password` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
