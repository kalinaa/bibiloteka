import {MigrationInterface, QueryRunner} from "typeorm";

export class createAuthorTable1625052797760 implements MigrationInterface {
    name = 'createAuthorTable1625052797760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `author` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `author`");
    }

}
