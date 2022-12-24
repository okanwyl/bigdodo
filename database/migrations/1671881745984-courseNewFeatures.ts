import { MigrationInterface, QueryRunner } from "typeorm";

export class courseNewFeatures1671881745984 implements MigrationInterface {
    name = 'courseNewFeatures1671881745984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "no" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "UQ_182730f6e098696908327fc5e67" UNIQUE ("no")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "UQ_182730f6e098696908327fc5e67"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "no"`);
    }

}
