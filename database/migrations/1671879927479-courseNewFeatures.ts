import { MigrationInterface, QueryRunner } from "typeorm";

export class courseNewFeatures1671879927479 implements MigrationInterface {
    name = 'courseNewFeatures1671879927479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" RENAME COLUMN "slug" TO "course_slug"`);
        await queryRunner.query(`ALTER TABLE "courses" RENAME CONSTRAINT "UQ_a3bb2d01cfa0f95bc5e034e1b7a" TO "UQ_4f0a2305325125e119d572c748b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" RENAME CONSTRAINT "UQ_4f0a2305325125e119d572c748b" TO "UQ_a3bb2d01cfa0f95bc5e034e1b7a"`);
        await queryRunner.query(`ALTER TABLE "courses" RENAME COLUMN "course_slug" TO "slug"`);
    }

}
