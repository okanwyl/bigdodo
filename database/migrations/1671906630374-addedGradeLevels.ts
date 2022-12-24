import { MigrationInterface, QueryRunner } from "typeorm";

export class addedGradeLevels1671906630374 implements MigrationInterface {
    name = 'addedGradeLevels1671906630374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590"`);
        await queryRunner.query(`CREATE TYPE "public"."courses_gradelevel_enum" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2')`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "gradeLevel" "public"."courses_gradelevel_enum" NOT NULL DEFAULT 'A1'`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD "lesson_content" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`CREATE TYPE "public"."users_gradelevel_enum" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gradeLevel" "public"."users_gradelevel_enum" NOT NULL DEFAULT 'A1'`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gradeLevel"`);
        await queryRunner.query(`DROP TYPE "public"."users_gradelevel_enum"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "lesson_content"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "gradeLevel"`);
        await queryRunner.query(`DROP TYPE "public"."courses_gradelevel_enum"`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
