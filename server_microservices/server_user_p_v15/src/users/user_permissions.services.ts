import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/auth/user.entity';
import { ResGroups } from 'src/res_groups/entity/res_groups.entity';
import { IrUiMenu } from 'src/ui_menu/entity/ui_menu.entity';
import { PermissionsMenu } from 'src/ui_menu/entity/permissions_menu.entity';
import { ResUserGroups } from 'src/res_groups/entity/res_user_groups.entity';
import { UserService } from 'src/auth/user.service';

@Injectable()
export class UsersPermissionsService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(ResUserGroups)
    private readonly resUserRepository: Repository<ResUserGroups>,
    @InjectRepository(ResGroups)
    private readonly groupRepository: Repository<ResGroups>,
    @InjectRepository(IrUiMenu)
    private readonly menuRepository: Repository<IrUiMenu>,
    @InjectRepository(PermissionsMenu)
    private readonly permissionRepository: Repository<PermissionsMenu>,
    private readonly userService: UserService,
  ) { }

  async findUserDetailsById(userId: number): Promise<any> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const rawData = await this.resUserRepository
      .createQueryBuilder('rug')
      .leftJoinAndSelect('rug.group', 'g')
      .leftJoinAndSelect('rug.user', 'u')
      .leftJoinAndSelect('g.permissions', 'pm')
      .leftJoinAndSelect('pm.menu', 'um')
      .where('rug.user_id = :userId', { userId })
      .select([
        'g.id AS group_id',
        'g.name AS group_name',
        'u.login AS login',
        'pm.view',
        'pm.edit',
        'pm.create',
        'pm.delete',
        'um.id AS menu_id',
        'um.sequence AS sequence',
        'um.key AS key_name',
        'um.name AS menu_name',
      ])
      .getRawMany();

    return this.mergePermissions(rawData);
  }

  private mergePermissions(data: any[]): any[] {
    const mergedData = data.reduce((acc, item) => {
      const {menu_id, menu_name,key_name, pm_view, pm_edit, pm_create, pm_delete } = item;

      if (!acc[menu_id]) {
        acc[menu_id] = {
          menu_name: menu_name,
          key_name: key_name,
          pm_view: pm_view,
          pm_edit: pm_edit,
          pm_create: pm_create,
          pm_delete: pm_delete
        };
      } else {
        acc[menu_id].pm_view = acc[menu_id].pm_view && pm_view;
        acc[menu_id].pm_edit = acc[menu_id].pm_edit && pm_edit;
        acc[menu_id].pm_create = acc[menu_id].pm_create && pm_create;
        acc[menu_id].pm_delete = acc[menu_id].pm_delete && pm_delete;
      }

      return acc;
    }, {});
    return Object.values(mergedData);
  }
}
