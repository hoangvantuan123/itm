import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Personnel } from './personnel.entity';

@Entity('hr_family')
export class Family {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Personnel, personnel => personnel.families, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personnel_id' })
  personnel: Personnel;

  @Column({ type: 'text', nullable: true })
  relationship: 'Father' | 'Mother' | 'Spouse' | 'Sibling' | 'Child';

  @Column({ type: 'text', nullable: true })
  full_name: string;

  @Column({ type: 'int', nullable: true })
  birth_year: number;

  @Column({ type: 'text', nullable: true })
  workplace: string;

  @Column({ type: 'text', nullable: true })
  job: string;

  @Column({ type: 'text', nullable: true })
  phone_number: string;

  @Column({ type: 'boolean', nullable: true })
  living_together: boolean;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date
}
