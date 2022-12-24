import { MigrationInterface, QueryRunner } from "typeorm";

export class courseNewFeatures1671879070362 implements MigrationInterface {
    name = 'courseNewFeatures1671879070362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "UQ_a3bb2d01cfa0f95bc5e034e1b7a" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "UQ_44a5da5958886ecb2185260f2ae" UNIQUE ("course_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "UQ_44a5da5958886ecb2185260f2ae"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "UQ_a3bb2d01cfa0f95bc5e034e1b7a"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "slug"`);
    }

}
