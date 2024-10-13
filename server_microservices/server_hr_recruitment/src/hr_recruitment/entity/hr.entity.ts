import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity('hr')
export class HrErp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'full_name', type: 'text', nullable: true })
  full_name: string;

  @Column({ type: 'text', nullable: true })
  gender: 'Male' | 'Female' | 'Other';

  @Column({ type: 'date', nullable: true })
  interview_date: Date;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'text', nullable: true })
  id_number: string;

  @Column({ type: 'date', nullable: true })
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
  supplier_details?: string;

  @Column({ type: 'boolean', default: false })
  synchronize: boolean;

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
  employee_code: string;


  @Column({ type: 'json', nullable: true })
  candidates_json: any[];  

  @Column({ type: 'json', nullable: true })
  families_json: any[];

  @Column({ type: 'json', nullable: true })
  educations_json: any[];

  @Column({ type: 'json', nullable: true })
  languages_json: any[];

  @Column({ type: 'json', nullable: true })
  experiences_json: any[];

  @Column({ type: 'json', nullable: true })
  interviews_json: any[];

  @Column({ type: 'json', nullable: true })
  projects_json: any[];

  @Column({ type: 'json', nullable: true })
  office_skills_json: any[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date;
}
