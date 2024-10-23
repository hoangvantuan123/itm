import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('default_mappings')
export class DefaultMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'original_name', type: 'varchar'})
  original_name: string;

  @Column({ name: 'mapped_name', type: 'varchar'})
  mapped_name: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
