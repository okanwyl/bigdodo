import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseEntity } from 'modules/course/course.entity';
import { LessonEntity } from 'modules/lesson/lesson.entity';
import { LessonService } from 'modules/lesson/lesson.service';
import { check } from 'prettier';
import { Transactional } from 'typeorm-transactional';
import { CreateQuizDto } from './create-quiz.dto';
import { QuizEntity } from './quiz.entity';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {
  constructor(
    private readonly quizRepository: QuizRepository,
  ) {}

  async getAll(): Promise<QuizEntity[]> {
    return await this.quizRepository.getAll();
  }

  async getByNo(no: number): Promise<QuizEntity> {
    return await this.quizRepository.getByNo(no);
  }

  @Transactional()
  async createQuiz(
    newQuiz: CreateQuizDto,
    lessonEntity: LessonEntity,
  ): Promise<QuizEntity | void> {
    return await this.quizRepository.createQuiz(newQuiz, lessonEntity);
  }
}
