import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IrUiMenu } from '../entity/ui_menu.entity';
import { UserService } from 'src/auth/user.service';
import { PermissionsMenu } from '../entity/permissions_menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(IrUiMenu)
    private readonly menuRepository: Repository<IrUiMenu>,
    @InjectRepository(PermissionsMenu)
    private readonly permissionsMenuRepository: Repository<PermissionsMenu>,
    private readonly userService: UserService,
  ) { }

  async findAll(userId: number): Promise<{ data: any[]; total: number }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [data, total] = await this.menuRepository.findAndCount({
      select: ['id', 'name', 'sequence', 'create_date', 'parent_id'],
      order: {
        create_date: 'DESC',
      },
      relations: ['parent'],
    });

    const dataWithParentName = data.map((menu) => ({
      id: menu.id,
      parent_id: menu.parent_id,
      sequence: menu.sequence,
      name: menu.name,
      key_name: menu.key,
      create_date: menu.create_date,
      parent_name: menu.parent ? menu.parent.name : null,
    }));

    return {
      data: dataWithParentName,
      total,
    };
  }
  async findAllPageLimit(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: any[]; total: number; totalPages: number }> {
    // Check if the user exists
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Calculate the offset for pagination
    const [data, total] = await this.menuRepository.findAndCount({
      select: ['id', 'name', 'sequence', 'create_date', 'parent_id', 'key'],
      order: {
        create_date: 'DESC',
      },
      relations: ['parent'],
      skip: (page - 1) * limit, // Pagination offset
      take: limit, // Limit number of results
    });
  
    // Map the data to include parent name
    const dataWithParentName = data.map((menu) => ({
      id: menu.id,
      parent_id: menu.parent_id,
      sequence: menu.sequence,
      name: menu.name,
      key_name: menu.key,
      create_date: menu.create_date,
      parent_name: menu.parent ? menu.parent.name : null,
    }));
  
    // Calculate total pages
    const totalPages = Math.ceil(total / limit);
  
    return {
      data: dataWithParentName,
      total,
      totalPages,
    };
  }
  
  async findOne(id: number): Promise<IrUiMenu> {
    return this.menuRepository.findOneBy({ id });
  }

  async create(
    userId: number,
    createUIMenu: Partial<IrUiMenu>,
  ): Promise<{ success: boolean; message: string; data?: IrUiMenu }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newData = {
      ...createUIMenu,
      create_uid: userId,
      write_uid: userId,
    };

    const menu = this.menuRepository.create(newData);
    await this.menuRepository.save(menu);
    return {
      success: true,
      message: 'created successfully',
    };
  }

  async update(
    userId: number,
    id: number,
    menu: Partial<IrUiMenu>,
  ): Promise<{ success: boolean; message: string; data?: IrUiMenu }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.menuRepository.update(id, menu);
    const updatedMenu = await this.menuRepository.findOneBy({ id });

    if (!updatedMenu) {
      throw new NotFoundException('Menu not found');
    }

    return {
      success: true,
      message: 'Updated successfully',
      data: updatedMenu,
    };
  }


  async remove(userId: number, ids: number[]): Promise<void> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.menuRepository.delete(ids);
  }

  async getAvailableMenus(
    groupId: number,
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    success: boolean;
    message: string;
    data?: IrUiMenu[];
    total?: number;
    totalPages?: number;
  }> {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const menuIdsWithPermissions = await this.permissionsMenuRepository
      .createQueryBuilder('permissions')
      .select('permissions.menu_id')
      .where('permissions.group_id = :groupId', { groupId })
      .getRawMany();

    const menuIdsWithPermissionsArray = menuIdsWithPermissions
      .map((row) => row.permissions_menu_id)
      .filter((id) => id != null);

    const offset = (page - 1) * limit;

    // Create query builder for fetching menus
    let queryBuilder = this.menuRepository
      .createQueryBuilder('menu')
      .skip(offset)
      .take(limit);

    // Only apply exclusion if menuIdsWithPermissionsArray has values
    if (menuIdsWithPermissionsArray.length > 0) {
      queryBuilder = queryBuilder.where('menu.id NOT IN (:...menuIds)', {
        menuIds: menuIdsWithPermissionsArray,
      });
    }

    const [availableMenus, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    if (availableMenus.length === 0) {
      return {
        success: true,
        message: 'No available menus found',
        data: [],
        total,
        totalPages,
      };
    }

    return {
      success: true,
      message: 'Available menus retrieved successfully',
      data: availableMenus,
      total,
      totalPages,
    };
  }

}
