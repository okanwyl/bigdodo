import { IsAscii, IsEnum } from 'class-validator';
import { LessonType } from './lesson.enum';

export class CreateLessonDto {
  @IsAscii()
  name: string;

  @IsEnum(LessonType)
  type: LessonType;
}
