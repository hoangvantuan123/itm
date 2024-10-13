import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Personnel } from './personnel.entity';

@Entity('hr_projects')
export class Projects {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: Personnel;


  @Column({ type: 'text', nullable: true })
  project_name: string;

  @Column({ type: 'text', nullable: true })
  task: string;
  @Column({ type: 'text', nullable: true })
  duration: string;
  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'date', nullable: true })
  start_date: Date;
  @Column({ type: 'date', nullable: true })
  end_date: Date;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date


}