import {MigrationInterface, QueryRunner} from "typeorm";

export class createReviewTable1625053306706 implements MigrationInterface {
    name = 'createReviewTable1625053306706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `review` (`id` int NOT NULL AUTO_INCREMENT, `content` varchar(255) NOT NULL, `rating` int NOT NULL, `bookId` int NOT NULL, `userId` int NULL, PRIMARY KEY (`id`, `bookId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_66a4f0f47943a0d99c16ecf90b2`");
        await queryRunner.query("ALTER TABLE `book` CHANGE `authorId` `authorId` int NULL");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_ae1ec2fd91f77b5df325d1c7b4a` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `review` ADD CONSTRAINT `FK_1337f93918c70837d3cea105d39` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_66a4f0f47943a0d99c16ecf90b2` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `book` DROP FOREIGN KEY `FK_66a4f0f47943a0d99c16ecf90b2`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_1337f93918c70837d3cea105d39`");
        await queryRunner.query("ALTER TABLE `review` DROP FOREIGN KEY `FK_ae1ec2fd91f77b5df325d1c7b4a`");
        await queryRunner.query("ALTER TABLE `book` CHANGE `authorId` `authorId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `book` ADD CONSTRAINT `FK_66a4f0f47943a0d99c16ecf90b2` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP TABLE `review`");
    }

}
