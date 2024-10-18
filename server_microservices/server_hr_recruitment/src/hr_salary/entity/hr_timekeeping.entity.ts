import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_timekeeping')
export class HrTimekeeping {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    EmpId: string;

    @Column({ type: 'text' })
    EmpName: string;

    @Column({ type: 'text' })
    DepartmentName: string;

    @Column({ type: 'int' ,  nullable: true})
    WkItemSeq: number;

    @Column({ type: 'text',  nullable: true })
    WkItemName: string;

    @Column({ type: 'int',  nullable: true })
    CompanySeq: number;

    @Column({ type: 'text',  nullable: true })
    WkDate: string;

    @Column({ type: 'int',  nullable: true })
    EmpSeq: number;

    @Column({ type: 'int',  nullable: true })
    DTCnt: number;

    @Column({ type: 'int' ,  nullable: true})
    DTime: number;

    @Column({ type: 'int' ,  nullable: true})
    MinCnt: number;

    @Column({ type: 'int',  nullable: true })
    UMGrpSeq: number;

    @Column({ type: 'int',  nullable: true })
    UMWkGrpSeq: number;

    @Column({ type: 'int' ,  nullable: true})
    LastUserSeq: number;

    @Column({ type: 'text', nullable: true })
    LastDateTime: string;

    @Column({ type: 'int', nullable: true  })
    IsOT: number;

    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    write_date: Date;
}
