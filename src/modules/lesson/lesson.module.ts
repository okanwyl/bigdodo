import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from 'modules/quiz/quiz.module';
import { LessonController } from './lesson.controller';
import { LessonEntity } from './lesson.entity';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';

@Module({
  imports: [TypeOrmModule.forFeature([LessonEntity]), QuizModule],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  exports: [LessonService, LessonRepository],
})
export class LessonModule {}
