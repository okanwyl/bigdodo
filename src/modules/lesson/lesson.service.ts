import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseEntity } from 'modules/course/course.entity';
import { CreateQuizDto } from 'modules/quiz/create-quiz.dto';
import { QuizEntity } from 'modules/quiz/quiz.entity';
import { QuizService } from 'modules/quiz/quiz.service';
import { Transactional } from 'typeorm-transactional';
import { CreateLessonDto } from './create-lesson.dto';
import { LessonEntity } from './lesson.entity';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly quizService: QuizService,
  ) {}

  async getAll(): Promise<LessonEntity[]> {
    return await this.lessonRepository.getAll();
  }

  async getByNo(no: number): Promise<LessonEntity> {
    const checkByNo = await this.lessonRepository.getByNo(no);
    if (!checkByNo) {
      throw new NotFoundException();
    }
    return await this.lessonRepository.findOne({
      where: {
        no: no,
      },
      relations: ['quiz'],
    });
  }

  @Transactional()
  async createLesson(
    newLesson: CreateLessonDto,
    course: CourseEntity,
  ): Promise<LessonEntity | void> {
    return this.lessonRepository.createLesson(newLesson, course);
  }

  async createQuizOnLesson(
    newQuiz: CreateQuizDto,
    no: number,
  ): Promise<QuizEntity | void> {
    const checkLesson = await this.lessonRepository.getByNo(no);
    if (!checkLesson) {
      throw new NotFoundException();
    }
    return await this.quizService.createQuiz(newQuiz, checkLesson);
  }
}
