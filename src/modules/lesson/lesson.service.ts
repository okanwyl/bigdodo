import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseEntity } from 'modules/course/course.entity';
import { check } from 'prettier';
import { Transactional } from 'typeorm-transactional';
import { CreateLessonDto } from './create-lesson.dto';
import { LessonEntity } from './lesson.entity';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async getAll(): Promise<LessonEntity[]> {
    return await this.lessonRepository.getAll();
  }

  async getByNo(no: number): Promise<LessonEntity> {
    return await this.lessonRepository.getByNo(no);
  }

  @Transactional()
  async createLesson(
    newLesson: CreateLessonDto,
    course: CourseEntity,
  ): Promise<LessonEntity | void> {
    return this.lessonRepository.createLesson(newLesson, course);
  }
}
