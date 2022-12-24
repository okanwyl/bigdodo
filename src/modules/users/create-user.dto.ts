import { IsAlpha, IsAscii, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsAscii()
  @IsAlpha()
  @MinLength(3)
  public firstname: string;

  @IsAscii()
  @IsAlpha()
  @MinLength(3)
  public lastname: string;
}
