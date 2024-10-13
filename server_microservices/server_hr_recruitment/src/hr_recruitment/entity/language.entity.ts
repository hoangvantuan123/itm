import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Personnel } from './personnel.entity';

@Entity('hr_language')
export class Language {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.languages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: Personnel;

  @Column({ type: 'text', nullable: true })
  language: string;

  @Column({ type: 'text', nullable: true })
  certificate_type: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  score: number;

  @Column({ type: 'text', nullable: true })
  level: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  has_bonus: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date
}
