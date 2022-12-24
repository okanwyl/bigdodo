import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from 'modules/lesson/lesson.module';
import { CourseController } from './course.controller';
import { CourseEntity } from './course.entity';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), LessonModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService],
})
export class CourseModule {}
