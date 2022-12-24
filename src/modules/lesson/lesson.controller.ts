import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateQuizDto } from 'modules/quiz/create-quiz.dto';
import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(
    private lessonService: LessonService,
  ) {}

  @Get(':no')
  async getById(@Param('no') no: number) {
    return this.lessonService.getByNo(no);
  }

  @Get()
  async getAll() {
    return this.lessonService.getAll();
  }

  @Post(':no')
  async createQuizOnLesson(
    @Param('no') no: number,
    @Body() newQuiz: CreateQuizDto,
  ) {
    return this.lessonService.createQuizOnLesson(newQuiz, no);
  }

  // @TODO Put method for update purpose
}
