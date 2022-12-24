import { Injectable } from '@nestjs/common';
import { LessonEntity } from 'modules/lesson/lesson.entity';
import { DataSource, Repository } from 'typeorm';
import { CourseEntity } from './course.entity';
import { CreateCourseDto } from './create-course.dto';
import { slugify } from './util/slugify';

@Injectable()
export class CourseRepository extends Repository<CourseEntity> {
  constructor(private dataSource: DataSource) {
    super(CourseEntity, dataSource.createEntityManager());
  }

  async getById(id: string): Promise<CourseEntity | null> {
    return this.findOne({ where: { id } });
  }

  async getByName(name: string): Promise<CourseEntity | null> {
    return this.findOne({ where: { name } });
  }

  async getBySlug(slug: string) {
    return this.findOne({ where: { slug } });
  }

  async getAll(): Promise<CourseEntity[]> {
    return this.find();
  }

  // @TODO for the content manager
  async createCourse(newCourse: CreateCourseDto) {
    const course = new CourseEntity();
    course.name = newCourse.name;
    course.description = newCourse.description;
    course.slug = slugify(newCourse.name);
    course.lessons = [];
    await this.save(course);
  }
}
