import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBooks1625053497304 implements MigrationInterface {
    name = 'updateBooks1625053497304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `isAdmin` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `book` ADD `image` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `book` ADD `file` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_1337f93918c70837d3cea105d39`");
        await queryRunner.query("ALTER TABLE `review` CHANGE `userId` `userId` int NULL");
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_66a4f0f47943a0d99c16ecf90b2`");
        await queryRunner.query("ALTER TABLE `book` CHANGE `authorId` `authorId` int NULL");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_1337f93918c70837d3cea105d39` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_66a4f0f47943a0d99c16ecf90b2` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_66a4f0f47943a0d99c16ecf90b2`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_1337f93918c70837d3cea105d39`");
        await queryRunner.query("ALTER TABLE `book` CHANGE `authorId` `authorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_66a4f0f47943a0d99c16ecf90b2` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` CHANGE `userId` `userId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_1337f93918c70837d3cea105d39` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book` DROP COLUMN `file`");
        await queryRunner.query("ALTER TABLE `book` DROP COLUMN `image`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `isAdmin`");
    }

}
