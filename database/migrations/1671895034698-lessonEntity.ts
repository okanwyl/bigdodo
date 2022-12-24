import { MigrationInterface, QueryRunner } from "typeorm";

export class lessonEntity1671895034698 implements MigrationInterface {
    name = 'lessonEntity1671895034698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lessons_type_enum" AS ENUM('listening', 'speaking', 'writing', 'reading')`);
        await queryRunner.query(`CREATE TABLE "lessons" ("no" SERIAL NOT NULL, "lesson_name" character varying NOT NULL, "type" "public"."lessons_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "courseId" uuid, CONSTRAINT "PK_4e6260150d39c8c34828490f96c" PRIMARY KEY ("no"))`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590"`);
        await queryRunner.query(`DROP TABLE "lessons"`);
        await queryRunner.query(`DROP TYPE "public"."lessons_type_enum"`);
    }

}
