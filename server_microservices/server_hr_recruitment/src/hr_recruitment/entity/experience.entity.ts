import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Personnel } from './personnel.entity';

@Entity('hr_experience')
export class Experience {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.experiences, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: Personnel;

  @Column({ type: 'text', nullable: true })
  company_name: string;

  @Column({ type: 'text', nullable: true })
  position: string;



  @Column({ type: 'text', nullable: true })
  employee_scale: string;
  @Column({ type: 'text', nullable: true })
  tasks: string;
  @Column({ type: 'text', nullable: true })
  salary: string;

  @Column({ nullable: true })
  start_date: Number;

  @Column({ nullable: true })
  end_date: Number;

  @Column({ type: 'text', nullable: true })
  description: string;



  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date
}
