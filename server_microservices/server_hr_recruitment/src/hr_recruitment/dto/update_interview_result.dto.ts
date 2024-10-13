// dto/update-interview-result.dto.ts
import { IsArray, IsBoolean,IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class UpdateInterviewResultDto {
  @IsArray()
  @IsOptional()
  personnelIds: string[]; 

  @IsBoolean()
  @IsOptional()
  interviewResult: boolean; 
}
