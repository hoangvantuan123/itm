import { IsString, IsOptional, IsEnum, IsDateString, ValidateNested, IsArray, IsInt, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
// DTO cho Family
class CreateFamilyDto {
  @IsInt()
  @IsOptional() 
  id?: number;

  @IsString()
  relationship: 'Father' | 'Mother' | 'Spouse' | 'Sibling' | 'Child';

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsInt()
  @IsOptional()
  birth_year?: number;

  @IsString()
  @IsOptional()
  workplace?: string;

  @IsString()
  @IsOptional()
  job?: string;

  @IsString()
  @IsOptional()
  phone_number?: string; // Có thể là tùy chọn

  @IsBoolean()
  @IsOptional()
  living_together?: boolean;
}

// DTO cho Education
class CreateEducationDto {
  @IsInt()
  @IsOptional()
  id?: number; // ID là tùy chọn

  @IsString()
  @IsOptional()
  school?: string;

  @IsString()
  @IsOptional()
  major?: string;

  @IsInt()
  @IsOptional()
  years?: number;

  @IsInt()
  @IsOptional()
  start_year?: number;

  @IsInt()
  @IsOptional()
  graduation_year?: number;

  @IsString()
  @IsOptional()
  grade?: 'Excellent' | 'Good' | 'Average' | 'Poor';
}

// DTO cho Language
class CreateLanguageDto {
  @IsInt()
  @IsOptional()
  id?: number; // ID là tùy chọn

  @IsString()
  language: string;

  @IsString()
  @IsOptional()
  certificate_type?: string;

  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  level?: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsString()
  @IsOptional()
  has_bonus?: string;
}

// DTO cho Experience
class CreateExperienceDto {
  @IsInt()
  @IsOptional()
  id?: number; // ID là tùy chọn
  
  @IsString()
  company_name: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsInt() 
  @IsOptional()
  start_date?: string;

  @IsInt()
  @IsOptional()
  end_date?: string;

  @IsString()
  @IsOptional()
  employee_scale?: string;

  @IsString()
  @IsOptional()
  tasks?: string;

  @IsString()
  @IsOptional()
  salary?: string; 

  @IsString()
  @IsOptional()
  description?: string;
}

// DTO cho Interview
class CreateInterviewDto {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsBoolean()
  @IsOptional()
  interview_result: boolean;

  @IsString()
  @IsOptional()
  recruitment_department: string;

  @IsString()
  @IsOptional()
  position: string;

  @IsString()
  @IsOptional()
  interviewer_name: string;

  @IsString()
  @IsOptional()
  appearance_criteria?: string;

  @IsString()
  @IsOptional()
  height?: string;

  @IsString()
  @IsOptional()
  criminal_record?: string;

  @IsString()
  @IsOptional()
  education_level?: string;

  @IsString()
  @IsOptional()
  reading_writing?: string;

  @IsString()
  @IsOptional()
  calculation_ability?: string;
  
 
}

// DTO cho Project
class CreateProjectDto {
  @IsInt()
  @IsOptional()
  id?: number;

 
  @IsString()
  @IsOptional()
  project_name: string;

  
  @IsString()
  @IsOptional()
  task: string;

  @IsString()
  @IsOptional()
  duration: string;


  @IsString()
  @IsOptional()
  summary: string;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;
  
 
}



// DTO cho Office_skills
class CreateOfficeSkillsDto {
  @IsInt()
  @IsOptional()
  id?: number;


  @IsString()
  @IsOptional()
  skill_name: string;


  @IsString()
  @IsOptional()
  skill_level: string;
}

// DTO chính cho Personnel với các bảng liên quan
export class CreatePersonnelWithDetailsDto {
  @IsInt()
  @IsOptional()
  id?: number;


  
  @IsInt()
  @IsOptional()
  id_hr_interview_candidates?: number;

  @IsString()
  full_name: string;

 
  @IsString()
  gender: string;

  @IsDateString()
  @IsOptional()
  interview_date?: string;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @IsString()
  @IsOptional()
  id_number?: string;

  @IsDateString()
  @IsOptional()
  id_issue_date?: string; // Mới thêm

  @IsString()
  @IsOptional()
  ethnicity?: string;

  @IsString()
  @IsOptional()
  id_issue_place?: string;

  @IsString()
  @IsOptional()
  insurance_number?: string;

  @IsString()
  @IsOptional()
  tax_number?: string;

  @IsString()
  @IsOptional()
  phone_number?: string; 

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  alternate_phone_number?: string;

  @IsString()
  @IsOptional()
  alternate_name?: string;

  @IsString()
  @IsOptional()
  alternate_relationship?: string;

  @IsString()
  @IsOptional()
  birth_address?: string;

  @IsString()
  @IsOptional()
  birth_province?: string;

  @IsString()
  @IsOptional()
  birth_district?: string;

  @IsString()
  @IsOptional()
  birth_ward?: string;

  @IsString()
  @IsOptional()
  current_address?: string;

  @IsString()
  @IsOptional()
  current_province?: string;

  @IsString()
  @IsOptional()
  current_district?: string;

  @IsString()
  @IsOptional()
  current_ward?: string;


  @IsBoolean()
  @IsOptional()
  type_personnel?: boolean;


  @IsString()
  @IsOptional()
  candidate_type?: string;


  @IsString()
  @IsOptional()
  supplier_details?: string;
  
  @IsString()
  @IsOptional()
  introducer_department?: string;

  @IsString()
  @IsOptional()
  introducer_introducer_name?: string;

  @IsString()
  @IsOptional()
  introducer_phone_number?: string;


  @IsString()
  @IsOptional()
  office_skill_excel	: string

  @IsString()
  @IsOptional()
  office_skill_word	: string

  @IsString()
  @IsOptional()
  office_skill_powerpoint	: string

  @IsString()
  @IsOptional()
  software_skill_autocad	: string

  @IsString()
  @IsOptional()
  software_skill_solidworks	: string

  @IsString()
  @IsOptional()
  software_skill_erp	: string

  @IsString()
  @IsOptional()
  software_skill_mes: string




  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateFamilyDto)
  families?: CreateFamilyDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateEducationDto)
  educations?: CreateEducationDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateLanguageDto)
  languages?: CreateLanguageDto[];

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateExperienceDto)
  experiences?: CreateExperienceDto[];



  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateProjectDto)
  projects?: CreateProjectDto[];



  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateOfficeSkillsDto)
  office_skills?: CreateOfficeSkillsDto[];

  @IsArray()
  @IsOptional()
  @Type(() => CreateInterviewDto)
  interviews?: CreateInterviewDto[];



}


