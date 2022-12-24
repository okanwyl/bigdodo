import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { CourseEntity } from './course.entity';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './create-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async findById(id: string) {
    const foundCourse = await this.courseRepository.getById(id);
    if (!foundCourse) {
      throw new NotFoundException();
    }
    return foundCourse;
  }

  async findBySlug(slug: string) {
    const foundBySlug = await this.courseRepository.getBySlug(slug);
    if (!foundBySlug) {
      throw new NotFoundException();
    }
    return foundBySlug;
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

  // @TODO  update function for content creator
}

//   async updateUser(
//     id: string,
//     updateRequest: CreateUserDto,
//   ): Promise<null | UsersEntity> {
//     const checkUser = await this.userRepository.getById(id);
//     if (!checkUser) {
//       throw new NotFoundException('User is not founded');
//     }
//     if (checkUser.email == updateRequest.email) {
//       await this.userRepository.update(id, {
//         ...(updateRequest.firstname && { firstName: updateRequest.firstname }),
//         ...(updateRequest.lastname && { lastName: updateRequest.lastname }),
//       });
//     } else {
//       const checkEmail = await this.userRepository.getByEmail(
//         updateRequest.email,
//       );
//       if (!checkEmail) {
//         await this.userRepository.update(id, {
//           ...(updateRequest.email && {
//             email: updateRequest.email,
//           }),
//           ...(updateRequest.firstname && {
//             firstName: updateRequest.firstname,
//           }),
//           ...(updateRequest.lastname && { lastName: updateRequest.lastname }),
//         });
//       } else {
//         throw new ConflictException();
//       }
//     }
//     return this.userRepository.getById(id);
//   }
// }
