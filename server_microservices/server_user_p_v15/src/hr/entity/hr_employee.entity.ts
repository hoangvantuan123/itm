import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Users } from 'src/auth/user.entity';
import { DepartmentEntity } from './hr_department.entity';

@Entity('hr_employee')
export class HrEmployeeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    resource_id: number;

    @Column({ nullable: true })
    company_id: number;

    @Column({ nullable: true })
    user_id: number;
    
    @ManyToOne(() => Users, user => user.hrEmployees)
    @JoinColumn({ name: 'user_id' })
    user: Users;

    @Column({ nullable: true })
    message_main_attachment_id: number;

    @Column({ nullable: true })
    color: number;

    @Column({ nullable: true })
    department_id: number;

    @Column({ nullable: true })
    job_id: number;

    @Column({ nullable: true })
    address_id: number;

    @Column({ nullable: true })
    work_contact_id: number;

    @Column({ nullable: true })
    work_location_id: number;

    @Column({ nullable: true })
    parent_id: number;

    @Column({ nullable: true })
    coach_id: number;

    @Column({ nullable: true })
    private_state_id: number;

    @Column({ nullable: true })
    private_country_id: number;

    @Column({ nullable: true })
    country_id: number;

    @Column({ nullable: true })
    children: number;

    @Column({ nullable: true })
    country_of_birth: string;

    @Column({ nullable: true })
    bank_account_id: number;

    @Column({ nullable: true })
    km_home_work: number;

    @Column({ nullable: true })
    departure_reason_id: number;

    @Column({ nullable: true })
    create_uid: number;

    @Column({ nullable: true })
    write_uid: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    job_title: string;

    @Column({ nullable: true })
    work_phone: string;

    @Column({ nullable: true })
    mobile_phone: string;

    @Column({ nullable: true })
    work_email: string;

    @Column({ nullable: true })
    private_street: string;

    @Column({ nullable: true })
    private_street2: string;

    @Column({ nullable: true })
    private_city: string;

    @Column({ nullable: true })
    private_zip: string;

    @Column({ nullable: true })
    private_phone: string;

    @Column({ nullable: true })
    private_email: string;

    @Column({ nullable: true })
    lang: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    marital: string;

    @Column({ nullable: true })
    spouse_complete_name: string;

    @Column({ nullable: true })
    place_of_birth: string;

    @Column({ nullable: true })
    ssnid: string;

    @Column({ nullable: true })
    sinid: string;

    @Column({ nullable: true })
    identification_id: string;

    @Column({ nullable: true })
    passport_id: string;

    @Column({ nullable: true })
    permit_no: string;

    @Column({ nullable: true })
    visa_no: string;

    @Column({ nullable: true })
    certificate: string;

    @Column({ nullable: true })
    study_field: string;

    @Column({ nullable: true })
    study_school: string;

    @Column({ nullable: true })
    emergency_contact: string;

    @Column({ nullable: true })
    emergency_phone: string;

    @Column({ nullable: true })
    employee_type: string;

    @Column()
    employee_id: string;

    @Column({ nullable: true })
    pin: string;

    @Column({ nullable: true })
    private_car_plate: string;

    @Column({ nullable: true })
    spouse_birthdate: Date;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    visa_expire: Date;

    @Column({ nullable: true })
    work_permit_expiration_date: Date;

    @Column({ nullable: true })
    departure_date: Date;

    @Column({ nullable: true })
    employee_properties: string;

    @Column({ nullable: true })
    additional_note: string;

    @Column({ nullable: true })
    notes: string;

    @Column({ default: true })
    active: boolean;

    @Column({ nullable: true })
    work_permit_scheduled_activity: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    write_date: Date;


    @ManyToOne(() => DepartmentEntity, department => department.employees)
    @JoinColumn({ name: 'department_id' })
    department: DepartmentEntity;
}
