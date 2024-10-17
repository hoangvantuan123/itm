
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
@Entity('hr_timekeeping')
export class HrTimekeeping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    cid: string;

    @Column({ type: 'timestamp' ,  nullable: true})
    check_in: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    write_date: Date
}
