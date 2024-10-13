import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PermissionsMenu } from './permissions_menu.entity';
@Entity('ui_menu')
export class IrUiMenu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne(() => IrUiMenu, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: IrUiMenu | null;

  @Column()
  create_uid: number;

  @Column()
  write_uid: number;

  @Column({ nullable: true })
  parent_path: string;

  @Column({ nullable: true })
  web_icon: string;

  @Column({ nullable: true })
  action: string;

  @Column()
  sequence: number;


  @Column()
  name: string;

  @Column()
  key: string;

  @Column({ nullable: true })
  name_parent_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  write_date: Date;

  @OneToMany(() => PermissionsMenu, (permissionsMenu) => permissionsMenu.menu)
  permissions: PermissionsMenu[];
}
