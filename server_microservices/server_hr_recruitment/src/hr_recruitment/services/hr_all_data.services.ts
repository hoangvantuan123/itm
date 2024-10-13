// src/hr-interview-candidates/hr-interview-candidates.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In } from 'typeorm';
import { HrInterviewCandidate } from '../entity/hr_interview_candidates.entity';
import { Personnel } from '../entity/personnel.entity';
import { Family } from '../entity/family.entity';
import { Education } from '../entity/education.entity';
import { Language } from '../entity/language.entity';
import { Experience } from '../entity/experience.entity';
import { InterviewResult } from '../entity/interview_results.entity';
import { OfficeSkills } from '../entity/office_skills.entity';
import { Projects } from '../entity/project.entity';
import { CreatePersonnelWithDetailsDto } from '../dto/create_hr_internview_candidate.dto';
import { CreatePersonnelWithDetails2Dto } from '../dto/create-personnel-with-details.dto';
import jwt from 'jsonwebtoken';
@Injectable()
export class HrAllDataService {
  constructor(
    @InjectRepository(HrInterviewCandidate)
    private readonly candidateRepository: Repository<HrInterviewCandidate>,
 

    @InjectRepository(Personnel)
    private readonly personnelRepository: Repository<Personnel>,

    @InjectRepository(Family)
    private readonly familyRepository: Repository<Family>,
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    @InjectRepository(InterviewResult)
    private readonly interviewRepository: Repository<InterviewResult>,
    @InjectRepository(OfficeSkills)
    private readonly officeSkillsRepository: Repository<OfficeSkills>,
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
  ) { }

  async create(
    createPersonnelDto: Partial<Personnel>,
  ): Promise<{ success: boolean; message: string; data?: Personnel }> {

    const data = this.personnelRepository.create(createPersonnelDto);
    await this.personnelRepository.save(data);
    return {
      success: true,
      message: 'Group created successfully',
      data: data,
    };
  }

  
  async findAllPageLimit(
    filter: Record<string, any> = {},
    page: number = 1,
    limit: number = 10000,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ data: Personnel[]; total: number; totalPages: number }> {
    const query = this.personnelRepository.createQueryBuilder('personnel');

    Object.entries(filter).forEach(([key, value]) => {
      if (value) {
        query.andWhere(`personnel.${key} = :${key}`, { [key]: value });
      }
    });

    if (startDate) {
      query.andWhere('personnel.create_date >= :startDate', { startDate });
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.andWhere('personnel.create_date <= :endOfDay', { endOfDay });
    }

    query
      .select([
        'personnel.id',
        'personnel.full_name',
        'personnel.gender',
        'personnel.create_date',
        'personnel.interview_date',
        'personnel.birth_date',
        'personnel.id_number',
        'personnel.phone_number',
        'personnel.email',
        'personnel.tax_number',
        'personnel.synchronize',
        'personnel.fac',
        'personnel.department',
        'personnel.team',
        'personnel.type_personnel',
        'personnel.position',
        'personnel.employee_code',
        'personnel.part',
        'personnel.erp_department_registration',
        'personnel.position',
        'personnel.synchronize_erp',
      ])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('personnel.id', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
  async findAllPageLimitFilter(
    filter: Record<string, any> = {},
    page: number = 1,
    limit: number = 1000,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ data: Personnel[]; total: number; totalPages: number }> {
    const query = this.personnelRepository.createQueryBuilder('personnel');

    if (filter.nameTags && filter.nameTags.length > 0) {
      const nameConditions = filter.nameTags.map((name: any, index: any) => `personnel.full_name ILIKE :name${index}`);
      filter.nameTags.forEach((name: any, index: any) => {
        query.setParameter(`name${index}`, `%${name}%`);
      });
      query.andWhere(`(${nameConditions.join(' OR ')})`);
    }

    if (filter.phoneNumberTags && filter.phoneNumberTags.length > 0) {
      const phoneConditions = filter.phoneNumberTags.map((phone: any, index: any) => `personnel.phone_number ILIKE :phone${index}`);
      filter.phoneNumberTags.forEach((phone: any, index: any) => {
        query.setParameter(`phone${index}`, `%${phone}%`);
      });
      query.andWhere(`(${phoneConditions.join(' OR ')})`);
    }

    if (filter.citizenshipIdTags && filter.citizenshipIdTags.length > 0) {
      const idConditions = filter.citizenshipIdTags.map((id: any, index: any) => `personnel.id_number ILIKE :id${index}`);
      filter.citizenshipIdTags.forEach((id: any, index: any) => {
        query.setParameter(`id${index}`, `%${id}%`);
      });
      query.andWhere(`(${idConditions.join(' OR ')})`);
    }

    if (filter.cid && filter.cid.length > 0) {
      const idConditions = filter.cid.map((id: any, index: any) => `personnel.employee_code ILIKE :id${index}`);
      filter.cid.forEach((id: any, index: any) => {
        query.setParameter(`id${index}`, `%${id}%`);
      });
      query.andWhere(`(${idConditions.join(' OR ')})`);
    }

    if (startDate) {
      query.andWhere('personnel.create_date >= :startDate', { startDate });
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.andWhere('personnel.create_date <= :endOfDay', { endOfDay });
    }

    if (filter.syn !== undefined) {
      query.andWhere('personnel.synchronize = :syn', { syn: filter.syn });
    }

    query.select([
      'personnel.id',
      'personnel.full_name',
      'personnel.gender',
      'personnel.create_date',
      'personnel.interview_date',
      'personnel.birth_date',
      'personnel.id_number',
      'personnel.phone_number',
      'personnel.email',
      'personnel.tax_number',
      'personnel.synchronize',
      'personnel.fac',
      'personnel.department',
      'personnel.team',
      'personnel.type_personnel',
      'personnel.position',
      'personnel.employee_code',
      'personnel.part',
      'personnel.erp_department_registration',
      'personnel.position',
      'personnel.synchronize_erp',
    ])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('personnel.id', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async synchronizeHr(ids: number[]): Promise<void> {
    await this.personnelRepository.update(
      { id: In(ids) },
      { synchronize: true }
    );
  }

  



 










}
