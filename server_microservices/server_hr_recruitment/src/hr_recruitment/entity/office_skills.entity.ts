import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Personnel } from './personnel.entity';

@Entity('hr_office_skills')
export class OfficeSkills {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.office_skills, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: Personnel;


  @Column({ type: 'text', nullable: true })
  skill_name: string;

  @Column({ type: 'text', nullable: true })
  skill_level: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date
}
