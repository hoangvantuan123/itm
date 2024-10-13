import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , JoinColumn} from 'typeorm';
import { Personnel } from './personnel.entity';

@Entity('hr_education')
export class Education {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.educations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: Personnel;

  @Column({ type: 'text', nullable: true })
  school: string;

  @Column({ type: 'text', nullable: true })
  major: string;

  @Column({ type: 'int', nullable: true })
  years: number;

  @Column({ type: 'int', nullable: true })
  start_year: number;

  @Column({ type: 'int', nullable: true })
  graduation_year: number;

  @Column({ type: 'text', nullable: true })
  grade: string;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date
}
