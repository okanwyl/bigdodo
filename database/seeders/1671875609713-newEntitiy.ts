import { CourseEntity } from 'modules/course/course.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class newEntitiy1671875609713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(CourseEntity, [
      {
        name: 'Course 1',
        description: `lorem ipsum dolorLorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum elit mi. Quisque \
          id auctor leo, non cursus augue. Aenean consectetur fermentum eros sed egestas. Phasellus finibus rutrum sem ut lacinia. Donec quam odio, venenatis eget nulla vitae, porttitor tempus leo. Ut sed egestas purus. In placerat ante non leo vulputate semper. Praesent ullamcorper metus nibh, quis pulvinar nibh porttitor non. Nullam lobortis euismod nibh, eu sagittis eros ultrices at. 
          Aenean interdum semper nibh ac rutrum. 
          Nam mollis leo a magna consequat mattis. Maecenas malesuada sagittis lacus, 
          quis accumsan diam venenatis nec. Phasellus dui sem, aliquam vel sagittis sit amet, luctus `,
        slug: 'course-1',
        lessons: [],
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.clear(CourseEntity);
  }
}
