// user.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserDto } from './users.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async createUser(user: Partial<Users>): Promise<Users> {
    const existingUser = await this.userRepository.findOne({
      where: [
        { login: user.login },
        { employee_code: user.employee_code }
      ],
    });

    if (existingUser) {
      throw new BadRequestException(
        'Login hoặc EmployeeCode đã được sử dụng. Vui lòng chọn giá trị khác.'
      );
    }

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findUserByEmail(login: string): Promise<Users | undefined> {
    try {
      const user = await this.userRepository.findOne({ where: { login } });
      return user;
    } catch (error) {
      throw new NotFoundException(`User with login ${login} not found`);
    }
  }

  async findUserByEmployeeCode(employee_code: string): Promise<Users | null> {
    return await this.userRepository.findOne({ where: { employee_code } });
  }


  async saveUser(user: Users): Promise<Users> {
    return this.userRepository.save(user);
  }
  async findOne(id: number): Promise<Users | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async save(user: Users): Promise<Users> {
    return this.userRepository.save(user);
  }
  async findUserById(userId: number): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(user: Users): Promise<Users> {
    const { id, login, employee_code } = user;

    const userWithSameLogin = await this.userRepository.findOne({
      where: { login },
    });

    if (userWithSameLogin && userWithSameLogin.id !== id) {
      throw new BadRequestException('Login đã được sử dụng bởi người dùng khác.');
    }

    const userWithSameEmployeeCode = await this.userRepository.findOne({
      where: { employee_code },
    });

    if (userWithSameEmployeeCode && userWithSameEmployeeCode.id !== id) {
      throw new BadRequestException('EmployeeCode đã được sử dụng bởi người dùng khác.');
    }

    return await this.userRepository.save(user);
  }

  async findUserAll(
    userId: number,
    page: number = 1,
    limit: number = 50,
  ): Promise<{ data: UserDto[]; total: number; totalPages: number }> {
    // Check if the user exists
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Fetch paginated user data
    const [data, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit, // Pagination offset
      take: limit, // Limit number of results
      order: {
        createDate: 'DESC', // Order by creation date
      },
    });

    // Map user entities to UserDto
    const userDtos = data.map((user) => new UserDto({
      id: user.id,
      companyId: user.companyId,
      partnerId: user.partnerId,
      active: user.active,
      createDate: user.createDate,
      login: user.login,
      actionId: user.actionId,
      createUid: user.createUid,
      writeUid: user.writeUid,
      signature: user.signature,
      share: user.share,
      writeDate: user.writeDate,
      totpSecret: user.totpSecret,
      notificationType: user.notificationType,
      status: user.status,
      karma: user.karma,
      rankId: user.rankId,
      nextRankId: user.nextRankId,
      employee_code: user.employee_code,
      name: user.name_user,
      language: user.language,
    }));

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    return {
      data: userDtos,
      total,
      totalPages,
    };
  }


  async findAllPageLimitFilter(
    filter: Record<string, any> = {},
    page: number = 1,
    limit: number = 1000,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ data: UserDto[]; total: number; totalPages: number }> {
    const query = this.userRepository.createQueryBuilder('users');


    if (filter.nameTags && filter.nameTags.length > 0) {
      const nameConditions = filter.nameTags.map((name: any, index: any) => `users.nameUser ILIKE :name${index}`);
      filter.nameTags.forEach((name: any, index: any) => {
        query.setParameter(`name${index}`, `%${name}%`);
      });
      query.andWhere(`(${nameConditions.join(' OR ')})`);
    }

    if (filter.employeeCodeTags && filter.employeeCodeTags.length > 0) {
      const employeeCodeConditions = filter.employeeCodeTags.map((cid: any, index: any) => `users.employee_code ILIKE :cid${index}`);
      filter.employeeCodeTags.forEach((cid: any, index: any) => {
        query.setParameter(`cid${index}`, `%${cid}%`);
      });
      query.andWhere(`(${employeeCodeConditions.join(' OR ')})`);
    }




    if (startDate) {
      query.andWhere('users.createDate >= :startDate', { startDate });
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.andWhere('users.createDate <= :endOfDay', { endOfDay });
    }

    query.select([
      'users.id',
      'users.companyId',
      'users.partnerId',
      'users.active',
      'users.createDate',
      'users.login',
      'users.actionId',
      'users.createUid',
      'users.writeUid',
      'users.signature',
      'users.share',
      'users.writeDate',
      'users.totpSecret',
      'users.notificationType',
      'users.status',
      'users.karma',
      'users.rankId',
      'users.nextRankId',
      'users.employee_code',
      'users.name_user',
      'users.language',
    ])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('users.id', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }


  async remove(userId: number, ids: number[]): Promise<void> {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(ids);
  }



  async updateUserID(
    userId: number,
    id: number,
    updateUser: Partial<Users>,
  ): Promise<Users> {

    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingUser = updateUser?.login ? await this.findUserByEmail(updateUser.login) : null;
    const existingEmployeeCode = updateUser?.employee_code ? await this.findUserByEmployeeCode(updateUser.employee_code) : null;

    if (existingUser && existingUser.id !== id) {
      delete updateUser.login;
    }

    if (existingEmployeeCode && existingEmployeeCode.id !== id) {
      delete updateUser.employee_code;
    }

    await this.userRepository.update(id, updateUser);
    return this.userRepository.findOneBy({ id });
  }



}
