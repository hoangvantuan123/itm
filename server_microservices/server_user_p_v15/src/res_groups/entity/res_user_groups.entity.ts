import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ResGroups } from './res_groups.entity';
import { Users } from 'src/auth/user.entity';

@Entity('res_users_groups')
export class ResUserGroups {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  create_uid: number;

  @Column({ nullable: true })
  write_uid: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date;

  @Column({ nullable: true })
  group_id: number;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => ResGroups, (group) => group.userGroups)
  @JoinColumn({ name: 'group_id' })
  group: ResGroups;

  @ManyToOne(() => Users, (user) => user.userGroups)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
