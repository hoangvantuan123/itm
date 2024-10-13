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
  salary?: string; // Hoặc kiểu khác, tùy thuộc vào cách lưu trữ

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

  
  @IsBoolean()
  @IsOptional()
  status_form?: boolean;


  @IsString()
  @IsOptional()
  candidate_type?: string;


  @IsString()
  @IsOptional()
  supplier_details?: string;


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

  @IsArray()
  @IsOptional()
  @Type(() => CreateInterviewDto)
  interviews?: CreateInterviewDto[];


  @ValidateNested()
  @IsArray()
  @IsOptional()
  @Type(() => CreateProjectDto)
  projects?: CreateProjectDto[];

  @ValidateNested()
  @IsArray()
  @IsOptional()
  @Type(() => CreateOfficeSkillsDto)
  office_skills?: CreateOfficeSkillsDto[];


  
}

export class CreatePersonnelWithDetails2Dto {
  @IsInt()
  @IsOptional()
  id?: number;

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
  id_issue_date?: string;

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

  @IsBoolean()
  @IsOptional()
  status_form?: boolean;

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
  fac?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  team?: string;

  @IsString()
  @IsOptional()
  jop_position?: string;

  @IsString()
  @IsOptional()
  type_of_degree?: string;

  @IsString()
  @IsOptional()
  type_classify?: string;

  @IsString()
  @IsOptional()
  employee_code?: string;

  @IsString()
  @IsOptional()
  contract_term?: string;

  @IsString()
  @IsOptional()
  line_model?: string;

  @IsString()
  @IsOptional()
  part?: string;

  @IsString()
  @IsOptional()
  erp_department_registration?: string;

  @IsString()
  @IsOptional()
  production?: string;

  @IsString()
  @IsOptional()
  section?: string;

  @IsString()
  @IsOptional()
  job_field?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsDateString()
  @IsOptional()
  entering_day?: string;

  @IsDateString()
  @IsOptional()
  leaving_day?: string;

  @IsInt()
  @IsOptional()
  probation_days?: number;

  @IsDateString()
  @IsOptional()
  official_date_first?: string;

  @IsDateString()
  @IsOptional()
  official_date_second?: string;

  @IsInt()
  @IsOptional()
  age?: number;

  @IsInt()
  @IsOptional()
  month_count?: number;

  @IsString()
  @IsOptional()
  partner_name?: string;

  @IsString()
  @IsOptional()
  partner_phone_number?: string;

  @IsInt()
  @IsOptional()
  number_of_children?: number;

  @IsString()
  @IsOptional()
  children_name_1?: string;

  @IsDateString()
  @IsOptional()
  children_birth_date_1?: string;

  @IsString()
  @IsOptional()
  children_gender_1?: string;

  @IsString()
  @IsOptional()
  children_name_2?: string;

  @IsDateString()
  @IsOptional()
  children_birth_date_2?: string;

  @IsString()
  @IsOptional()
  children_gender_2?: string;

  @IsString()
  @IsOptional()
  children_name_3?: string;

  @IsDateString()
  @IsOptional()
  children_birth_date_3?: string;

  @IsString()
  @IsOptional()
  children_gender_3?: string;

  @IsString()
  @IsOptional()
  father_name?: string;

  @IsString()
  @IsOptional()
  father_phone_number?: string;

  @IsString()
  @IsOptional()
  mother_name?: string;

  @IsString()
  @IsOptional()
  mother_phone_number?: string;

  @IsInt()
  @IsOptional()
  distance_from_household_to_company?: number;

  @IsString()
  @IsOptional()
  highest_education_level?: string;

  @IsString()
  @IsOptional()
  school_name?: string;

  @IsString()
  @IsOptional()
  major?: string;

  @IsString()
  @IsOptional()
  school_year?: string;

  @IsString()
  @IsOptional()
  year_ended?: string;

  @IsString()
  @IsOptional()
  year_of_graduation?: string;

  @IsString()
  @IsOptional()
  classification?: string;

  @IsString()
  @IsOptional()
  work_department_1?: string;

  @IsString()
  @IsOptional()
  work_responsibility_1?: string;

  @IsString()
  @IsOptional()
  company_name_1?: string;

  @IsDateString()
  @IsOptional()
  entrance_day_1?: string;

  @IsDateString()
  @IsOptional()
  leaving_day_1?: string;

  @IsString()
  @IsOptional()
  salary_1?: string;

  @IsString()
  @IsOptional()
  work_department_2?: string;

  @IsString()
  @IsOptional()
  work_responsibility_2?: string;

  @IsString()
  @IsOptional()
  company_name_2?: string;

  @IsDateString()
  @IsOptional()
  entrance_day_2?: string;

  @IsDateString()
  @IsOptional()
  leaving_day_2?: string;

  @IsString()
  @IsOptional()
  salary_2?: string;

  @IsString()
  @IsOptional()
  language_1?: string;

  @IsString()
  @IsOptional()
  certificate_type_1?: string;

  @IsString()
  @IsOptional()
  score_1?: string;

  @IsString()
  @IsOptional()
  level_1?: string;

  @IsString()
  @IsOptional()
  language_2?: string;

  @IsString()
  @IsOptional()
  certificate_type_2?: string;

  @IsString()
  @IsOptional()
  score_2?: string;

  @IsString()
  @IsOptional()
  level_2?: string;

  @IsString()
  @IsOptional()
  language_3?: string;

  @IsString()
  @IsOptional()
  certificate_type_3?: string;

  @IsString()
  @IsOptional()
  score_3?: string;

  @IsString()
  @IsOptional()
  level_3?: string;

  @IsString()
  @IsOptional()
  social_insurance?: string;


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
}
//DTO 