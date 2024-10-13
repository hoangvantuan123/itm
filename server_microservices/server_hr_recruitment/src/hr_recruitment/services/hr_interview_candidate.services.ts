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
import jwt from 'jsonwebtoken';
@Injectable()
export class HrInterviewCandidatesService {
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

  async createCandidate(createData: Partial<HrInterviewCandidate>): Promise<HrInterviewCandidate> {
    let personnel: Personnel;

    if (createData.personnel) {
      personnel = await this.personnelRepository.save(createData.personnel);
    }

    const candidate = this.candidateRepository.create({
      ...createData,
      personnel,
    });

    return await this.candidateRepository.save(candidate);
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





  async findByPhoneNumber(phone_number: string): Promise<any> {
    const candidate = await this.candidateRepository.findOne({
      where: { phone_number },
      relations: ['personnel'], // Thêm quan hệ personnel
    });

    if (!candidate) {
      return {
        success: false,
        message: 'Candidate not found with this phone number',
        redirectUrl: '/your-desired-url',
      };
    }

    const personnelId = candidate.personnel ? candidate.personnel.id : null;

    if (personnelId) {
      return {
        success: false,
        message: 'Candidate found but no personnel associated with this candidate.',
        redirectUrl: '/your-desired-url',
      };
    }

    const combinedInfo = `${candidate.id}:${candidate.phone_number}:${candidate.full_name}:${candidate.email}`;
    const encodedRouter = Buffer.from(combinedInfo).toString('base64');

    return {
      success: true,
      data: {
        idCadidate: candidate.id,
        phoneNumber: candidate.phone_number,
        name: candidate.full_name,
        email: candidate.email,
        router: encodedRouter,
        gender: candidate.gender,
        id_card_number: candidate.id_card_number,
        interview_date: candidate.interview_date,
        job_position: candidate.job_position,
        personnelId,
      },
    };
  }










  async create(
    createPersonnelWithDetailsDto: CreatePersonnelWithDetailsDto,
  ): Promise<{ success: boolean; message: string; data?: Personnel }> {
    try {
      return await this.personnelRepository.manager.transaction(
        async (entityManager: EntityManager) => {
          const {
            families = [],
            educations = [],
            languages = [],
            experiences = [],
            office_skills = [],
            projects = [],
            ...personnelData
          } = createPersonnelWithDetailsDto;

          const personnel = this.personnelRepository.create(personnelData);
          const savedPersonnel = await entityManager.save(Personnel, personnel);

          const interviewEntities = [{
            interview_result: false,
            recruitment_department: 'Default Department',
            position: 'Default Position',
            interviewer_name: 'Default Interviewer',
            appearance_criteria: 'Default Appearance',
            height: 'N/A',
            criminal_record: 'No',
            education_level: 'High School',
            reading_writing: 'Yes',
            calculation_ability: 'Yes',
            personnel: savedPersonnel,
          }];

          const familyEntities = families.map((family) => ({
            ...family,
            personnel: savedPersonnel,
          }));
          const educationEntities = educations.map((education) => ({
            ...education,
            personnel: savedPersonnel,
          }));
          const languageEntities = languages.map((language) => ({
            ...language,
            personnel: savedPersonnel,
          }));
          const experienceEntities = experiences.map((experience) => ({
            ...experience,
            personnel: savedPersonnel,
          }));
          const projectEntities = projects.map((project) => ({
            ...project,
            personnel: savedPersonnel,
          }));

          const officeSkillsEntities = office_skills.map((office_skill) => ({
            ...office_skill,
            personnel: savedPersonnel,
          }));

          // 3. Lưu tất cả các đối tượng liên quan
          await Promise.all([
            familyEntities.length > 0
              ? entityManager.save(Family, familyEntities)
              : Promise.resolve(),
            educationEntities.length > 0
              ? entityManager.save(Education, educationEntities)
              : Promise.resolve(),
            languageEntities.length > 0
              ? entityManager.save(Language, languageEntities)
              : Promise.resolve(),
            experienceEntities.length > 0
              ? entityManager.save(Experience, experienceEntities)
              : Promise.resolve(),
            projectEntities.length > 0
              ? entityManager.save(Projects, projectEntities)
              : Promise.resolve(),

            officeSkillsEntities.length > 0
              ? entityManager.save(OfficeSkills, officeSkillsEntities)
              : Promise.resolve(),
            entityManager.save(InterviewResult, interviewEntities),
          ]);

          if (personnelData?.id_hr_interview_candidates) {
            await entityManager
              .createQueryBuilder()
              .update(HrInterviewCandidate)
              .set({
                personnel: savedPersonnel,
                interview_status: 'default',
                form_status: 'Submitted',
              })
              .where('id = :id', { id: personnelData?.id_hr_interview_candidates })
              .execute();
          }

          return {
            success: true,
            message: 'Personnel and related details created successfully and hr_interview_candidates updated',
            data: savedPersonnel,
          };
        },
      );
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create personnel with details and update hr_interview_candidates',
      };
    }
  }


}
