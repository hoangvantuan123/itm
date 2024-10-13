import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateResGroupsDto {
  @IsString()
  @IsString()
  name: string;

  @IsString()
  comment: string;
}
