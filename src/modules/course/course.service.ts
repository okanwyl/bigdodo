import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from 'modules/lesson/create-lesson.dto';
import { LessonEntity } from 'modules/lesson/lesson.entity';
import { LessonRepository } from 'modules/lesson/lesson.repository';
import { LessonService } from 'modules/lesson/lesson.service';
import { Transactional } from 'typeorm-transactional';
import { CourseEntity } from './course.entity';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly lessonRepository: LessonRepository,
  ) {}

  async findById(id: string) {
    const foundCourse = await this.courseRepository.getById(id);
    if (!foundCourse) {
      throw new NotFoundException();
    }
    return foundCourse;
  }

  async getAll(): Promise<CourseEntity[]> {
    return await this.courseRepository.getAll();
  }

  @Transactional()
  async createCourse(newCourse: CreateCourseDto): Promise<CourseEntity | void> {
    const checkCourseName = await this.courseRepository.getByName(
      newCourse.name,
    );
    if (checkCourseName) {
      throw new ConflictException();
    }

    return this.courseRepository.createCourse(newCourse);
  }

  // @TODO fix clean code: move to lesson service
  async addLessonToCourse(newLesson: CreateLessonDto, slug: string) {
    const foundBySlug = await this.courseRepository.getBySlug(slug);
    if (!foundBySlug) {
      throw new NotFoundException();
    }
    return await this.lessonRepository.createLesson(newLesson, foundBySlug);
  }

  // @TODO fix clean code : move to lesson service
  async findBySlug(courseSlug: string) {
    const foundCourse = await this.courseRepository.getBySlug(courseSlug);
    if (!foundCourse) {
      throw new NotFoundException();
    }
    return await this.courseRepository.findOne({
      where: {
        slug: courseSlug,
      },
      relations: ['lessons'],
    });
  }
  // @TODO  update function for content creator
}
