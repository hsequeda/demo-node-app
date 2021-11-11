import {MigrationInterface, QueryRunner} from "typeorm";

export class first1636597538559 implements MigrationInterface {
    name = 'first1636597538559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`person_entity\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`married\` tinyint NOT NULL, \`age\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`child_entity\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`father_id\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`child_entity\` ADD CONSTRAINT \`FK_0bf73d0137f6c5f9e66eb8b15d9\` FOREIGN KEY (\`father_id\`) REFERENCES \`person_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`child_entity\` DROP FOREIGN KEY \`FK_0bf73d0137f6c5f9e66eb8b15d9\``);
        await queryRunner.query(`DROP TABLE \`child_entity\``);
        await queryRunner.query(`DROP TABLE \`person_entity\``);
    }

}
