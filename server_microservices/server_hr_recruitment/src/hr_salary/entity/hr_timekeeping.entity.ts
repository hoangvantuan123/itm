import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_timekeeping')
export class HrTimekeeping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({  type: 'text',  nullable: true })
    empid: string;

    @Column({ type: 'text',  nullable: true })
    empname: string;

    @Column({ type: 'text' ,  nullable: true})
    department_name: string;

    @Column({ type: 'int' ,  nullable: true})
    wk_item_seq: number;

    @Column({ type: 'text',  nullable: true })
    wk_item_name: string;

    @Column({ type: 'int',  nullable: true })
    company_seq: number;

    @Column({ type: 'text',  nullable: true })
    wk_date: string;

    @Column({ type: 'text',  nullable: true })
    emp_seq: number;

    @Column({ type: 'text',  nullable: true })
    dt_cnt: string;

    @Column({ type: 'int' ,  nullable: true})
    d_time: number;

    @Column({ type: 'int' ,  nullable: true})
    min_cnt: number;

    @Column({ type: 'int',  nullable: true })
    umgrp_seq: number;

    @Column({ type: 'int',  nullable: true })
    umwkgrp_seq: number;

    @Column({ type: 'int' ,  nullable: true})
    last_user_seq: number;

    @Column({ type: 'text', nullable: true })
    last_date_time: string;

    @Column({ type: 'text', nullable: true  })
    is_ot: string;

    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    write_date: Date;
}
