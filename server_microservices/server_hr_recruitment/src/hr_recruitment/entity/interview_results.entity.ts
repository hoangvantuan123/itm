import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Personnel } from './personnel.entity';

@Entity('hr_interview_results')
export class InterviewResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.interviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: Personnel;

  @Column({ type: 'boolean', default: false }) 
  interview_result: boolean;

  @Column({ type: 'text', nullable: true })
  recruitment_department: string;

  @Column({ type: 'text', nullable: true })
  position: string;

  @Column({ type: 'text', nullable: true })
  interviewer_name: string;

  @Column({ type: 'text', nullable: true })
  appearance_criteria: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  height: string;

  @Column({ type: 'text', nullable: true })
  criminal_record: string;

  @Column({ type: 'text', nullable: true })
  education_level: string;

  @Column({ type: 'text', nullable: true })
  reading_writing: string;

  @Column({ type: 'text', nullable: true })
  calculation_ability: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date
}
