import {MigrationInterface, QueryRunner} from "typeorm";

export class createTopicTable1625052884068 implements MigrationInterface {
    name = 'createTopicTable1625052884068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `topic` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `topic`");
    }

}
