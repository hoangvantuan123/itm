import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/auth/user.service';
import { DepartmentEntity } from '../entity/hr_department.entity';

@Injectable()
export class HrDepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly resDepartmentRepository: Repository<DepartmentEntity>,
    private readonly userService: UserService,
  ) {}

  // Tạo mới
  async create(
    userId: number,
    data: Partial<DepartmentEntity>,
  ): Promise<{ success: boolean; message: string; data?: DepartmentEntity }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newData = {
        ...data,
        create_uid: userId,
        write_uid: userId,
      };
    const newGroup = this.resDepartmentRepository.create(newData);
    await this.resDepartmentRepository.save(newGroup);
    return {
      success: true,
      message: 'created successfully'
    };
  }


  async findAllPageLimit(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: DepartmentEntity[]; total: number; totalPages: number }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [data, total] = await this.resDepartmentRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        create_date: 'DESC',
      },
    });
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
    };
  }

  async findAll(userId: number): Promise<{ data: DepartmentEntity[]; total: number }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [data, total] = await this.resDepartmentRepository.findAndCount({
      order: {
        create_date: 'DESC',
      },
    });

    return {
      data,
      total,
    };
  }


}
