import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLessonDto } from 'modules/lesson/create-lesson.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  async getAll() {
    return this.courseService.getAll();
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.courseService.findBySlug(slug);
  }

  @Post()
  async createCourse(@Body() newCourse: CreateCourseDto) {
    return this.courseService.createCourse(newCourse);
  }

  @Post(':slug')
  async createLessonOnCourse(
    @Param('slug') slug: string,
    @Body() newLesson: CreateLessonDto,
  ) {
    return this.courseService.addLessonToCourse(newLesson, slug);
  }

  // @TODO Put method for update purpose
}
