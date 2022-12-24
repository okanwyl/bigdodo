import { IsAscii } from 'class-validator';

export class CreateQuizDto {
  @IsAscii()
  description: string;
}
