import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.courseService.findById(id);
  }

  @Get()
  async getAll() {
    return this.courseService.getAll();
  }

  @Get('/s/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.courseService.findBySlug(slug);
  }

  @Post()
  async createCourse(@Body() newCourse: CreateCourseDto) {
    return this.courseService.createCourse(newCourse);
  }

  // @TODO Put method for update purpose
}
//   @Put(':id')
//   async updateUser(@Param('id') id: string, @Body() updateUser: CreateUserDto) {
//     return this.userService.updateUser(id, updateUser);
//   }
// }
