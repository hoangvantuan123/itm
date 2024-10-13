import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsMenu } from '../entity/permissions_menu.entity';
import { UserService } from 'src/auth/user.service';
import { UpdatePermissionsMenuDto } from '../dto/update-permissions-menu.dto';

@Injectable()
export class PermissionsMenuService {
  constructor(
    @InjectRepository(PermissionsMenu)
    private readonly permissionsMenusRepository: Repository<PermissionsMenu>,
    private readonly userService: UserService,
  ) {}

  async create(
    userId: number,
    menuIds: number[],
    groupId: number,
  ): Promise<{ success: boolean; message: string; data?: PermissionsMenu[] }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newMenus = menuIds.map((id) => {
      return this.permissionsMenusRepository.create({
        menu_id: id,
        create_uid: userId,
        write_uid: userId,
        group_id: groupId,
      });
    });

    await this.permissionsMenusRepository
      .createQueryBuilder()
      .insert()
      .into(PermissionsMenu)
      .values(newMenus)
      .execute();

    return {
      success: true,
      message: 'Successfully',
    };
  }

  async findAllPageLimit(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: any[]; total: number; totalPages: number }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [data, total] = await this.permissionsMenusRepository.findAndCount({
      select: [
        'id',
        'view',
        'edit',
        'create',
        'delete',
        'menu_id',
        'create_date',
      ],
      order: {
        create_date: 'DESC',
      },
      relations: ['menu'],
    });

    const dataWithParentName = data.map((menu) => ({
      id: menu.id,
      menu_id: menu.menu_id,
      view: menu.view,
      edit: menu.edit,
      create: menu.create,
      delete: menu.delete,
      create_date: menu.create_date,
      menu_name: menu.menu ? menu.menu.name : null,
      sequence: menu.menu ? menu.menu.sequence : null,
    }));
    const totalPages = Math.ceil(total / limit);

    return {
      data: dataWithParentName,
      total,
      totalPages,
    };
  }

  async remove(userId: number, ids: number[]): Promise<void> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.permissionsMenusRepository.delete(ids);
  }

  async findUsersByGroupId(
    groupId: number,
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: any[]; total: number; totalPages: number }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const skip = (page - 1) * limit;
    const take = limit;

    const [permissions, total] = await this.permissionsMenusRepository
      .createQueryBuilder('permissionsMenu')
      .innerJoinAndSelect('permissionsMenu.menu', 'menu')
      .where('permissionsMenu.group_id = :groupId', { groupId })
      .getManyAndCount();

    const paginatedPermissions = await this.permissionsMenusRepository
      .createQueryBuilder('permissionsMenu')
      .innerJoinAndSelect('permissionsMenu.menu', 'menu')
      .where('permissionsMenu.group_id = :groupId', { groupId })
      .select([
        'permissionsMenu.id',
        'permissionsMenu.create_date',
        'permissionsMenu.menu_id',
        'permissionsMenu.view',
        'permissionsMenu.edit',
        'permissionsMenu.create',
        'permissionsMenu.delete',
        'menu.name',
      ])
      .orderBy('permissionsMenu.create_date', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();

    // Tính tổng số trang
    const totalPages = Math.ceil(total / limit);

    // Trả về dữ liệu đã phân trang
    return {
      data: paginatedPermissions.map((permission) => ({
        id: permission.id,
        menuId: permission.menu_id,
        createDate: permission.create_date,
        view: permission.view,
        edit: permission.edit,
        create: permission.create,
        delete: permission.delete,
        name: permission.menu.name,
      })),
      total,
      totalPages,
    };
  }

  async updatePermissionsMenu(
    userId: number,
    updateDto: UpdatePermissionsMenuDto,
  ): Promise<{
    success: boolean;
    message: string;
    data?: UpdatePermissionsMenuDto;
  }> {
    const { id, field, value } = updateDto;

    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updateData = { [field]: value };

    await this.permissionsMenusRepository.update(id, updateData);

    return {
      success: true,
      message: 'Updated successfully',
      data: updateDto,
    };
  }
}
