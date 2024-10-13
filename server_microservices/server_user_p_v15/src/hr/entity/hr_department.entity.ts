import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { HrEmployeeEntity } from './hr_employee.entity';


@Entity('hr_departments')
export class DepartmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    company_id: number;

    @Column({ type: 'int', nullable: true })
    parent_id: number;

    @Column({ type: 'int', nullable: true })
    manager_id: number;

    @Column({ type: 'int', nullable: true })
    color: number;

    @Column({ type: 'int', nullable: true })
    master_department_id: number;

    @Column({ type: 'int', nullable: true })
    create_uid: number;

    @Column({ type: 'int', nullable: true })
    write_uid: number;


    @Column({ type: 'text', nullable: true })
    parent_path: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'jsonb', nullable: true })
    note: { en_US: string; vi_VN: string };

    @Column({ default: true })
    active: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    write_date: Date;


    @OneToMany(() => HrEmployeeEntity, employee => employee.department)
    employees: HrEmployeeEntity[];


}
