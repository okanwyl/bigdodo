import { IsAlpha, IsAscii, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsAscii()
  @MinLength(3)
  public name: string;

  @IsAscii()
  public description: string;
}
