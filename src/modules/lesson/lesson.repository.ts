import { Injectable } from '@nestjs/common';
import { CourseEntity } from 'modules/course/course.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateLessonDto } from './create-lesson.dto';
import { LessonEntity } from './lesson.entity';

@Injectable()
export class LessonRepository extends Repository<LessonEntity> {
  constructor(private dataSoruce: DataSource) {
    super(LessonEntity, dataSoruce.createEntityManager());
  }

  async getByNo(no: number): Promise<LessonEntity | null> {
    return this.findOne({ where: { no } });
  }

  async getAll(): Promise<LessonEntity[]> {
    return this.find();
  }

  async createLesson(newLesson: CreateLessonDto, course: CourseEntity) {
    const lesson = new LessonEntity();
    lesson.name = newLesson.name;
    lesson.type = newLesson.type;
    lesson.course = course;
    await this.save(lesson);
  }
}
