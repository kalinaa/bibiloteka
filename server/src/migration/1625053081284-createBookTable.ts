import {MigrationInterface, QueryRunner} from "typeorm";

export class createBookTable1625053081284 implements MigrationInterface {
    name = 'createBookTable1625053081284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `book` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `descrpition` varchar(255) NOT NULL, `pages` int NOT NULL, `releaseYear` int NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `book_topic` (`bookId` int NOT NULL, `topicId` int NOT NULL, INDEX `IDX_80a629a49c3329ec7a28594e5d` (`bookId`), INDEX `IDX_47a25e95b68cc294341862197e` (`topicId`), PRIMARY KEY (`bookId`, `topicId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_66a4f0f47943a0d99c16ecf90b2` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book_topic` ADD CONSTRAINT `FK_80a629a49c3329ec7a28594e5d1` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book_topic` ADD CONSTRAINT `FK_47a25e95b68cc294341862197e8` FOREIGN KEY (`topicId`) REFERENCES `topic`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `book_topic` DROP FOREIGN KEY `FK_47a25e95b68cc294341862197e8`");
        await queryRunner.query("ALTER TABLE `book_topic` DROP FOREIGN KEY `FK_80a629a49c3329ec7a28594e5d1`");
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_66a4f0f47943a0d99c16ecf90b2`");
        await queryRunner.query("DROP INDEX `IDX_47a25e95b68cc294341862197e` ON `book_topic`");
        await queryRunner.query("DROP INDEX `IDX_80a629a49c3329ec7a28594e5d` ON `book_topic`");
        await queryRunner.query("DROP TABLE `book_topic`");
        await queryRunner.query("DROP TABLE `book`");
    }

}
