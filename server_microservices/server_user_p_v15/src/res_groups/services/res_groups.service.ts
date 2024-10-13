import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResGroups } from '../entity/res_groups.entity';
import { UserService } from 'src/auth/user.service';

@Injectable()
export class ResGroupsService {
  constructor(
    @InjectRepository(ResGroups)
    private readonly resGroupsRepository: Repository<ResGroups>,
    private readonly userService: UserService,
  ) {}

  // Tạo mới
  async create(
    userId: number,
    createResGroupsDto: Partial<ResGroups>,
  ): Promise<{ success: boolean; message: string; data?: ResGroups }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newGroup = this.resGroupsRepository.create(createResGroupsDto);
    await this.resGroupsRepository.save(newGroup);
    return {
      success: true,
      message: 'Group created successfully',
      data: newGroup,
    };
  }

  async findAllPageLimit(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: ResGroups[]; total: number; totalPages: number }> {
    // Check if the user exists
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Fetch paginated resource groups
    const [data, total] = await this.resGroupsRepository.findAndCount({
      skip: (page - 1) * limit, // Pagination offset
      take: limit, // Limit the number of results
      order: {
        create_date: 'DESC', // Order by creation date
      },
    });
  
    // Calculate total pages
    const totalPages = Math.ceil(total / limit);
  
    return {
      data,
      total,
      totalPages,
    };
  }
  
  
  async findAll(userId: number): Promise<{ data: ResGroups[]; total: number }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [data, total] = await this.resGroupsRepository.findAndCount({
      order: {
        create_date: 'DESC',
      },
    });

    return {
      data,
      total,
    };
  }

  // Lấy 1 bản ghi
  async findOne(id: number): Promise<ResGroups> {
    return this.resGroupsRepository.findOneBy({ id });
  }

  // Cập nhật
  async update(
    id: number,
    updateResGroupsDto: Partial<ResGroups>,
  ): Promise<ResGroups> {
    await this.resGroupsRepository.update(id, updateResGroupsDto);
    return this.resGroupsRepository.findOneBy({ id });
  }

  async remove(userId: number, ids: number[]): Promise<void> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.resGroupsRepository.delete(ids);
  }






}
