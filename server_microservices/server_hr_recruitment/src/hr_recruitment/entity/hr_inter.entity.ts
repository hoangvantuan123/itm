import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Family } from './family.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
@Entity('hr_inter')
export class HrInter {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'full_name', type: 'text', nullable: true })
    full_name: string;

    @Column({ type: 'text', nullable: true })
    gender: string;

    @Column({ type: 'timestamp', nullable: true })
    interview_date: Date;

    @Column({ type: 'timestamp', nullable: true })
    start_date: Date;

    @Column({ type: 'timestamp', nullable: true })
    birth_date: Date;

    @Column({ type: 'text', nullable: true })
    id_number: string;

    @Column({ type: 'timestamp', nullable: true })
    id_issue_date: Date;

    @Column({ type: 'text', nullable: true })
    ethnicity: string;

    @Column({ type: 'text', nullable: true })
    id_issue_place: string;

    @Column({ type: 'text', nullable: true })
    insurance_number: string;

    @Column({ type: 'text', nullable: true })
    tax_number: string;

    @Column({ type: 'text', nullable: true })
    phone_number: string;

    @Column({ type: 'text', nullable: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    alternate_phone_number: string;

    @Column({ type: 'text', nullable: true })
    alternate_name: string;

    @Column({ type: 'text', nullable: true })
    alternate_relationship: string;

    @Column({ type: 'text', nullable: true })
    birth_address: string;

    @Column({ type: 'text', nullable: true })
    birth_province: string;

    @Column({ type: 'text', nullable: true })
    birth_district: string;

    @Column({ type: 'text', nullable: true })
    birth_ward: string;

    @Column({ type: 'text', nullable: true })
    current_address: string;

    @Column({ type: 'text', nullable: true })
    current_province: string;

    @Column({ type: 'text', nullable: true })
    current_district: string;

    @Column({ type: 'text', nullable: true })
    current_ward: string;

    @Column({ name: 'type_personnel', type: 'boolean', default: false })
    type_personnel: boolean;


    @Column({ type: 'text', nullable: true })
    introducer_department: string;
    @Column({ type: 'text', nullable: true })
    introducer_introducer_name: string;
    @Column({ type: 'text', nullable: true })
    introducer_phone_number: string;

    @Column({ type: 'text', nullable: true })
    @IsString()
    candidate_type: string;

    @Column({ type: 'text', nullable: true })
    @IsString()
    supplier_details?: string


    @Column({ nullable: true, type: 'int' })
    id_hr_interview_candidates?: number;

    /* Đồng bộ */
    @Column({ type: 'boolean', default: false })
    synchronize: boolean;
    /*  */
    @Column({ type: 'boolean', default: false })
    synchronize_erp: boolean;

    @Column({ type: 'boolean', default: false })
    status_form: boolean;

    /* Vị trí */
    @Column({ type: 'text', nullable: true })
    fac: string;

    @Column({ type: 'text', nullable: true })
    department: string;

    @Column({ type: 'text', nullable: true })
    team: string;

    @Column({ type: 'text', nullable: true })
    jop_position: string;

    @Column({ type: 'text', nullable: true })
    type_of_degree: string;

    @Column({ type: 'text', nullable: true })
    type_classify: string;

    @Column({ type: 'text', nullable: true })
    employee_code: string;

    @Column({ type: 'text', nullable: true })
    contract_term: string;

    @Column({ type: 'text', nullable: true })
    line_model: string;

    @Column({ type: 'text', nullable: true })
    part: string;



    @Column({ nullable: true })
    erp_department_registration: string;  // Đăng ký bp trên ERP

    @Column({ nullable: true })
    production: string;

    @Column({ nullable: true })
    section: string;  // Section

    @Column({ nullable: true })
    job_field: string;  // Job field

    @Column({ nullable: true })
    position: string;  // Position

    @Column({ type: 'timestamp', nullable: true })
    entering_day: Date;  // Entering day

    @Column({ type: 'timestamp', nullable: true })
    leaving_day: Date;  // Leaving day

    @Column({ nullable: true })
    probation_days: number;  // PROBATION (day)

    @Column({ type: 'timestamp', nullable: true })
    official_date_first: Date;  // OFFICIAL DATE 1st/Ngày ký HĐ lần 1

    @Column({ type: 'timestamp', nullable: true })
    official_date_second: Date;  // OFFICIAL DATE 2nd/Ngày ký HĐ lần 2


    @Column({ nullable: true })
    age: number;  // Age

    @Column({ nullable: true })
    month_count: number;  // Đếm tháng

    @Column({ nullable: true })
    partner_name: string;  // Partner name

    @Column({ nullable: true })
    partner_phone_number: string;  // Partner's phone number

    @Column({ nullable: true })
    number_of_children: number;  // Số con

    @Column({ nullable: true })
    children_name_1: string;  // Children name 1

    @Column({ type: 'timestamp', nullable: true })
    children_birth_date_1: Date;  // Children birth date 1

    @Column({ nullable: true })
    children_gender_1: string;  // Children gender 1

    @Column({ nullable: true })
    children_name_2: string;  // Children name 2

    @Column({ type: 'timestamp', nullable: true })
    children_birth_date_2: Date;  // Children date birth 2

    @Column({ nullable: true })
    children_gender_2: string;  // Children gender 2

    @Column({ nullable: true })
    children_name_3: string;  // Children name 3

    @Column({ type: 'timestamp', nullable: true })
    children_birth_date_3: Date;  // Children date birth 3

    @Column({ nullable: true })
    children_gender_3: string;  // Children gender 3

    @Column({ nullable: true })
    father_name: string;  // Father name

    @Column({ nullable: true })
    father_phone_number: string;  // Father phone number

    @Column({ nullable: true })
    mother_name: string;  // Mother name

    @Column({ nullable: true })
    mother_phone_number: string;  // Mother phone number


    @Column({ nullable: true })
    distance_from_household_to_company: number;  // Khoảng cách từ nơi đăng ký hộ khẩu đến công ty

    @Column({ nullable: true })
    highest_education_level: string;  // Highest level of education

    @Column({ nullable: true })
    school_name: string;  // School name

    @Column({ nullable: true })
    major: string;  // Major

    @Column({ nullable: true })
    school_year: string;  // School year

    @Column({ nullable: true })
    year_ended: string;  // Year ended

    @Column({ nullable: true })
    year_of_graduation: string;  // Year of graduation

    @Column({ nullable: true })
    classification: string;  // Classification





    @Column({ nullable: true })
    work_department_1: string;  // Bộ phận làm việc 1

    @Column({ nullable: true })
    work_responsibility_1: string;  // Công việc phụ trách 1

    @Column({ nullable: true })
    company_name_1: string;  // Company name 1

    @Column({ nullable: true })
    entrance_day_1: string;  // Entrance day 1

    @Column({ nullable: true })
    leaving_day_1: string;  // Leaving day 1

    @Column({ nullable: true })
    salary_1: string;  // Salary 1

    @Column({ nullable: true })
    work_department_2: string;  // Bộ phận làm việc 2

    @Column({ nullable: true })
    work_responsibility_2: string;  // Công việc phụ trách 2

    @Column({ nullable: true })
    company_name_2: string;  // Company name 2

    @Column({ nullable: true })
    entrance_day_2: string;  // Entrance day 2

    @Column({ nullable: true })
    leaving_day_2: string;  // Leaving day 2


    @Column({ nullable: true })
    salary_2: string;  // Salary 2
    /* Ngôn ngữ 1 */
    @Column({ nullable: true })
    language_1: string;

    @Column({ nullable: true })
    certificate_type_1: string;

    @Column({ nullable: true })
    score_1: string;

    @Column({ nullable: true })
    level_1: string;
    /* Ngôn ngữ 2 */
    @Column({ nullable: true })
    language_2: string;

    @Column({ nullable: true })
    certificate_type_2: string;

    @Column({ nullable: true })
    score_2: string;

    @Column({ nullable: true })
    level_2: string;

    /* Ngôn ngữ 3 */
    @Column({ nullable: true })
    language_3: string;

    @Column({ nullable: true })
    certificate_type_3: string;

    @Column({ nullable: true })
    score_3: string;

    @Column({ nullable: true })
    level_3: string;

    @Column({ nullable: true })
    social_insurance: string;  // ĐÓNG BHXH

    @Column({ nullable: true })
    applicant_status: string;

    @Column({ nullable: true })
    applicant_type: string;


    @Column({ nullable: true })
    office_skill_excel	: string

    @Column({ nullable: true })
    office_skill_word	: string

    @Column({ nullable: true })
    office_skill_powerpoint	: string

    @Column({ nullable: true })
    software_skill_autocad	: string

    @Column({ nullable: true })
    software_skill_solidworks	: string

    @Column({ nullable: true })
    software_skill_erp	: string

    @Column({ nullable: true })
    software_skill_mes: string

    @Column({ nullable: true })
    desired_base_salary: string
    
    @Column({ nullable: true })
    desired_total_salary: string
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    write_date: Date
}
