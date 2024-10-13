// src/hr-interview-candidates/hr-interview-candidate.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Personnel } from './personnel.entity';
@Entity('hr_interview_candidates')
export class HrInterviewCandidate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'full_name', type: 'text', nullable: true })
    full_name: string;

    @Column({ type: 'text', nullable: true })
    gender: string;

    @Column()
    phone_number: string;

    @Column({ nullable: true })
    current_residence?: string;

    @Column({ nullable: true })
    form_status?: string;

    @Column({ nullable: true, type: 'int' })
    birth_year?: number;

    @Column({ nullable: true })
    hometown?: string;

    @Column({ nullable: true })
    contractor?: string;

    @Column({ nullable: true })
    job_position?: string;

    @Column({ nullable: true })
    interview_status?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    id_card_number?: string;

    @Column({ nullable: true, type: 'date' })
    interview_date?: Date;


    @ManyToOne(() => Personnel, (personnel) => personnel.candidates, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'personnel_id' })
    personnel: Personnel;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    write_date: Date
}
