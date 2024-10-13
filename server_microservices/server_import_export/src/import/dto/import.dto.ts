// src/import/import.dto.ts
import { IsArray, IsObject, IsString } from 'class-validator';

export class ImportDataDto {
  @IsString()
  method: string;

  @IsString()
  model: string;

  @IsArray()
  data: Array<Record<string, any>>;
}
