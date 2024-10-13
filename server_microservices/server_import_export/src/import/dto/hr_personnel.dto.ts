export class CreatePersonnelDto {
  full_name?: string;
  gender?: string;
  interview_date?: Date;
  start_date?: Date;
  birth_date?: Date;
  id_number?: string;
  id_issue_date?: Date;
  ethnicity?: string;
  id_issue_place?: string;
  insurance_number?: string;
  tax_number?: string;
  phone_number?: string;
  email?: string;
  alternate_phone_number?: string;
  alternate_name?: string;
  alternate_relationship?: string;
  birth_address?: string;
  birth_province?: string;
  birth_district?: string;
  birth_ward?: string;
  current_address?: string;
  current_province?: string;
  current_district?: string;
  current_ward?: string;
  type_personnel?: boolean;
  candidate_type?: string;
  supplier_details?: string;

  // Các trường mới thêm từ Personnel entity
  introducer_department?: string;
  introducer_introducer_name?: string;
  introducer_phone_number?: string;

  fac?: string;
  department?: string;
  team?: string;
  jop_position?: string;
  type_of_degree?: string;
  type_classify?: string;
  employee_code?: string;
  contract_term?: string;
  line_model?: string;
  part?: string;

  erp_department_registration?: string;  // Đăng ký bp trên ERP
  production?: string;
  section?: string;  // Section
  job_field?: string;  // Job field
  position?: string;  // Position

  entering_day?: Date;  // Entering day
  leaving_day?: Date;  // Leaving day
  probation_days?: number;  // PROBATION (day)
  official_date_first?: Date;  // OFFICIAL DATE 1st/Ngày ký HĐ lần 1
  official_date_second?: Date;  // OFFICIAL DATE 2nd/Ngày ký HĐ lần 2

  age?: number;  // Age
  month_count?: number;  // Đếm tháng
  partner_name?: string;  // Partner name
  partner_phone_number?: string;  // Partner's phone number

  number_of_children?: number;  // Số con
  children_name_1?: string;  // Children name 1
  children_birth_date_1?: Date;  // Children birth date 1
  children_gender_1?: string;  // Children gender 1
  children_name_2?: string;  // Children name 2
  children_birth_date_2?: Date;  // Children date birth 2
  children_gender_2?: string;  // Children gender 2
  children_name_3?: string;  // Children name 3
  children_birth_date_3?: Date;  // Children date birth 3
  children_gender_3?: string;  // Children gender 3

  father_name?: string;  // Father name
  father_phone_number?: string;  // Father phone number
  mother_name?: string;  // Mother name
  mother_phone_number?: string;  // Mother phone number

  distance_from_household_to_company?: number;  // Khoảng cách từ nơi đăng ký hộ khẩu đến công ty
  highest_education_level?: string;  // Highest level of education
  school_name?: string;  // School name
  major?: string;  // Major
  school_year?: string;  // school_year
  year_ended?: string;
  year_of_graduation?: string;
  classification?: string;


  company_name_1?: string;  // Company name 1
  entrance_day_1?: string;  // Entrance day 1
  leaving_day_1?: string;  // Leaving day 1
  work_department_1?: string;  // Bộ phận làm việc
  work_responsibility_1?: string;  // Công việc phụ trách
  salary_1?: string;  // Công việc phụ trách

  company_name_2?: string;  // Company name 2
  entrance_day_2?: string;  // Entrance day 2
  leaving_day_2?: string;  // Leaving day 2
  work_department_2?: string;  // Bộ phận làm việc
  work_responsibility_2?: string;  // Công việc phụ trách
  salary_2?: string;  // Công việc phụ trách

  /*  */
  language_1: string;
  certificate_type_1: string;
  score_1: string;
  level_1: string;
  /*  */
  language_2: string;
  certificate_type_2: string;
  score_2: string;
  level_2: string;
  /*  */
  language_3: string;
  certificate_type_3: string;
  score_3: string;
  level_3: string;


  social_insurance?: boolean;  // Đóng BHXH

  // Các trường hệ thống (nếu cần)
  synchronize?: boolean;
  status_form?: boolean;
}
