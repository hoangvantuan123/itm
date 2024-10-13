import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IrUiMenu } from './ui_menu.entity';
import { ResGroups } from 'src/res_groups/entity/res_groups.entity';

@Entity('permissions_menu')
export class PermissionsMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  create_uid: number;

  @Column()
  write_uid: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date;

  @Column({ default: false })
  view: boolean;

  @Column({ default: false })
  edit: boolean;

  @Column({ default: false })
  create: boolean;

  @Column({ default: false })
  delete: boolean;

  @Column({ nullable: true })
  menu_id: number;

  @Column({ nullable: true })
  group_id: number;

  @ManyToOne(() => IrUiMenu, { nullable: false })
  @JoinColumn({ name: 'menu_id' })
  menu: IrUiMenu;

  @ManyToOne(() => ResGroups, { nullable: false })
  @JoinColumn({ name: 'group_id' })
  group: ResGroups;
}
