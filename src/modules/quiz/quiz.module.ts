import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './quiz.entity';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity])],
  providers: [QuizService, QuizRepository],
  exports: [QuizService],
})
export class QuizModule {}
