import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/auth/user.service';
import { HrEmployeeEntity } from '../entity/hr_employee.entity';

@Injectable()
export class HrEmployeeService {
  constructor(
    @InjectRepository(HrEmployeeEntity)
    private readonly resHrEmployeRepository: Repository<HrEmployeeEntity>,
    private readonly userService: UserService,
  ) {}

  // Tạo mới
  async create(
    userId: number,
    data: Partial<HrEmployeeEntity>,
  ): Promise<{ success: boolean; message: string; data?: HrEmployeeEntity }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newData = {
        ...data,
        create_uid: userId,
        write_uid: userId,
      };
    const newGroup = this.resHrEmployeRepository.create(newData);
    await this.resHrEmployeRepository.save(newGroup);
    return {
      success: true,
      message: 'created successfully'
    };
  }


  async findAllPageLimit(
    userId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: HrEmployeeEntity[]; total: number; totalPages: number }> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [data, total] = await this.resHrEmployeRepository.findAndCount({
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

  async remove(userId: number, ids: number[]): Promise<void> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.resHrEmployeRepository.delete(ids);
  }
  
  async update(
    id: number,
    data: Partial<HrEmployeeEntity>,
  ): Promise<HrEmployeeEntity> {
    await this.resHrEmployeRepository.update(id, data);
    return this.resHrEmployeRepository.findOneBy({ id });
  }



}
