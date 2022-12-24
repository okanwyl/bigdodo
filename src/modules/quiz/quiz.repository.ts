import { Injectable } from '@nestjs/common';
import { LessonEntity } from 'modules/lesson/lesson.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateQuizDto } from './create-quiz.dto';
import { QuizEntity } from './quiz.entity';

@Injectable()
export class QuizRepository extends Repository<QuizEntity> {
  constructor(private dataSource: DataSource) {
    super(QuizEntity, dataSource.createEntityManager());
  }
  async getByNo(no: number): Promise<QuizEntity | null> {
    return this.findOne({ where: { no } });
  }

  async getAll(): Promise<QuizEntity[]> {
    return this.find();
  }

  async createQuiz(newQuiz: CreateQuizDto, lesson: LessonEntity) {
    const quiz = new QuizEntity();
    quiz.description = newQuiz.description;
    quiz.lesson = lesson;
    await this.save(quiz);
  }
}
