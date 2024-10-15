// src/hr-interview-candidates/hr-interview-candidates.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In } from 'typeorm';
import { HrInterviewCandidate } from '../entity/hr_interview_candidates.entity';
import { Personnel } from '../entity/personnel.entity';
@Injectable()
export class HrInterviewCandidatesService {
  constructor(
    @InjectRepository(HrInterviewCandidate)
    private readonly candidateRepository: Repository<HrInterviewCandidate>,

    @InjectRepository(Personnel)
    private readonly personnelRepository: Repository<Personnel>,

  ) { }

  async getAllCandidates(): Promise<HrInterviewCandidate[]> {
    return await this.candidateRepository.find({ relations: ['personnel'] });
  }

  async findAllPageLimit(
    filter: Record<string, any> = {},
    page: number = 1,
    limit: number = 500,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ data: HrInterviewCandidate[]; total: number; totalPages: number }> {
    const query = this.candidateRepository.createQueryBuilder('candidate');
    query.leftJoinAndSelect('candidate.personnel', 'personnel');

    if (filter) {
      Object.keys(filter).forEach((key) => {
        const value = filter[key];
        if (value !== undefined && value !== null) {
          query.andWhere(`candidate.${key} = :${key}`, { [key]: value });
        }
      });
    }

    // Date range filtering
    if (startDate) {
      query.andWhere('candidate.create_date >= :startDate', { startDate });
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.andWhere('candidate.create_date <= :endOfDay', { endOfDay });
    }

    // Select only necessary fields
    query.select([
      'candidate.id',
      'candidate.full_name',
      'candidate.gender',
      'candidate.phone_number',
      'candidate.email',
      'candidate.id_card_number',
      'candidate.interview_date',
      'candidate.create_date',
      'candidate.job_position',
      'candidate.form_status',
      'candidate.interview_status',
      'candidate.personnel',
      'personnel.id'
    ]);

    query.skip((page - 1) * limit)
      .take(limit)
      .orderBy('candidate.create_date', 'DESC');

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
  ): Promise<{ data: HrInterviewCandidate[]; total: number; totalPages: number }> {
    const query = this.candidateRepository.createQueryBuilder('candidate');
    query.leftJoinAndSelect('candidate.personnel', 'personnel');


    if (filter.nameTags && filter.nameTags.length > 0) {
      const nameConditions = filter.nameTags.map((name: any, index: any) => `candidate.full_name ILIKE :name${index}`);
      filter.nameTags.forEach((name: any, index: any) => {
        query.setParameter(`name${index}`, `%${name}%`);
      });
      query.andWhere(`(${nameConditions.join(' OR ')})`);
    }

    if (filter.phoneNumberTags && filter.phoneNumberTags.length > 0) {
      const phoneConditions = filter.phoneNumberTags.map((phone: any, index: any) => `candidate.phone_number ILIKE :phone${index}`);
      filter.phoneNumberTags.forEach((phone: any, index: any) => {
        query.setParameter(`phone${index}`, `%${phone}%`);
      });
      query.andWhere(`(${phoneConditions.join(' OR ')})`);
    }

    if (filter.citizenshipIdTags && filter.citizenshipIdTags.length > 0) {
      const idConditions = filter.citizenshipIdTags.map((id: any, index: any) => `candidate.id_number ILIKE :id${index}`);
      filter.citizenshipIdTags.forEach((id: any, index: any) => {
        query.setParameter(`id${index}`, `%${id}%`);
      });
      query.andWhere(`(${idConditions.join(' OR ')})`);
    }



    if (startDate) {
      query.andWhere('candidate.create_date >= :startDate', { startDate });
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.andWhere('candidate.create_date <= :endOfDay', { endOfDay });
    }

    query.select([
      'candidate.id',
      'candidate.full_name',
      'candidate.gender',
      'candidate.phone_number',
      'candidate.email',
      'candidate.id_card_number',
      'candidate.interview_date',
      'candidate.create_date',
      'candidate.job_position',
      'candidate.form_status',
      'candidate.interview_status',
      'candidate.personnel',
      'personnel.id'
    ])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('candidate.create_date', 'DESC');

      const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getCandidateById(id: number): Promise<HrInterviewCandidate> {
    const candidate = await this.candidateRepository.findOne({
      where: { id },
      relations: ['personnel'],
    });

    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }

    return candidate;
  }



  async updateCandidate(id: number, updateData: Partial<HrInterviewCandidate>): Promise<HrInterviewCandidate> {
    const candidate = await this.candidateRepository.findOne({ where: { id } });

    if (!candidate) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }

    await this.candidateRepository.update({ id }, updateData);

    return this.getCandidateById(id);
  }

  async deleteCandidate(id: number): Promise<void> {
    const result = await this.candidateRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Candidate with ID ${id} not found`);
    }
  }
  async remove(ids: number[]): Promise<void> {
    await this.candidateRepository.delete(ids);
  }





  










}
