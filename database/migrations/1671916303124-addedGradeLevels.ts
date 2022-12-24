import { MigrationInterface, QueryRunner } from "typeorm";

export class addedGradeLevels1671916303124 implements MigrationInterface {
    name = 'addedGradeLevels1671916303124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "FK_f56ce628607db921fc8554cb18f"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP CONSTRAINT "UQ_f56ce628607db921fc8554cb18f"`);
        await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "quizNo"`);
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_fbc23b621643fdfe9e9d579131e"`);
        await queryRunner.query(`ALTER TABLE "quiz" ALTER COLUMN "lessonNo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "REL_fbc23b621643fdfe9e9d579131"`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_fbc23b621643fdfe9e9d579131e" FOREIGN KEY ("lessonNo") REFERENCES "lessons"("no") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_fbc23b621643fdfe9e9d579131e"`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "REL_fbc23b621643fdfe9e9d579131" UNIQUE ("lessonNo")`);
        await queryRunner.query(`ALTER TABLE "quiz" ALTER COLUMN "lessonNo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_fbc23b621643fdfe9e9d579131e" FOREIGN KEY ("lessonNo") REFERENCES "lessons"("no") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD "quizNo" integer`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "UQ_f56ce628607db921fc8554cb18f" UNIQUE ("quizNo")`);
        await queryRunner.query(`ALTER TABLE "lessons" ADD CONSTRAINT "FK_f56ce628607db921fc8554cb18f" FOREIGN KEY ("quizNo") REFERENCES "quiz"("no") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
