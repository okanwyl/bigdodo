import { IsEmail, IsEmpty, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;
}
