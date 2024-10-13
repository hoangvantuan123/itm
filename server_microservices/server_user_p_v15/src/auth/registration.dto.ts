import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  login: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  partnerId: string;

  @IsString()
  nameUser: string;
  @IsString()
  language: string;
}
