import { UsersEntity } from '../../src/modules/users/users.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsers1669834539569 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(UsersEntity, [
      {
        firstName: 'tester',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.clear(UsersEntity);
  }
}
