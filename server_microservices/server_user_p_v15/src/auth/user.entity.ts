import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResUserGroups } from 'src/res_groups/entity/res_user_groups.entity';
import { HrEmployeeEntity } from 'src/hr/entity/hr_employee.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  companyId: number;

  @Column({ nullable: true })
  partnerId: number;

  @Column({ default: false })
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  actionId: number;

  @Column({ nullable: true })
  createUid: number;

  @Column({ nullable: true })
  writeUid: number;

  @Column({ nullable: true })
  signature: string;

  @Column({ default: false })
  share: boolean;

  @Column({ type: 'timestamp', nullable: true })
  writeDate: Date;

  @Column({ nullable: true })
  totpSecret: string;

  @Column({ nullable: true })
  notificationType: string;

  @Column({ nullable: true })
  status: string;

  @Column({ default: 0 })
  karma: number;

  @Column({ nullable: true })
  rankId: number;

  @Column({ nullable: true })
  nextRankId: number;

  @Column({ nullable: true })
  employeeCode: string;

  @Column({ nullable: true })
  nameUser: string;

  @Column({ nullable: true })
  language: string;

  beforeInsert() {
    this.hashPassword();
  }

  @OneToMany(() => ResUserGroups, (userGroups) => userGroups.user)
  userGroups: ResUserGroups[];

  @OneToMany(() => HrEmployeeEntity, hrEmployee => hrEmployee.user)
  hrEmployees: HrEmployeeEntity[];


  private hashPassword() {
    const saltRounds = 10;
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, saltRounds);
    }
  }
}
