// src/hr-interview-candidates/hr-interview-candidates.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In } from 'typeorm';
import { HrInterviewCandidate } from '../entity/hr_interview_candidates.entity';
import { Personnel } from '../entity/personnel.entity';
import { HrInter } from '../entity/hr_inter.entity';
@Injectable()
export class HrInterServices {
  constructor(
    @InjectRepository(Personnel)
    private readonly personnelRepository: Repository<Personnel>,
    @InjectRepository(HrInter)
    private readonly hrInterRepository: Repository<HrInter>,

  ) { }

  async create(
    createHrInterDto: Partial<HrInter>,
  ): Promise<{ success: boolean; message: string; data?: HrInter }> {

    const existingEntry = await this.hrInterRepository.findOne({
      where: { phone_number: createHrInterDto.phone_number }
    });

    if (existingEntry) {
      return {
        success: false,
        message: 'Số điện thoại đã tồn tại trong cơ sở dữ liệu',
      };
    }

    const data = this.hrInterRepository.create(createHrInterDto);
    await this.hrInterRepository.save(data);
    return {
      success: true,
      message: 'Nhóm đã được tạo thành công',
      data: data,
    };
  }



  async findAllPageLimit(
    filter: Record<string, any> = {},
    page: number = 1,
    limit: number = 10000,
    startDate?: Date,
    endDate?: Date,
  ): Promise<{ data: HrInter[]; total: number; totalPages: number }> {
    const query = this.hrInterRepository.createQueryBuilder('hr_inter');

    Object.entries(filter).forEach(([key, value]) => {
      if (value) {
        query.andWhere(`hr_inter.${key} = :${key}`, { [key]: value });
      }
    });

    if (startDate) {
      query.andWhere('hr_inter.create_date >= :startDate', { startDate });
    }

    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.andWhere('hr_inter.create_date <= :endOfDay', { endOfDay });
    }

    query
      .select([
        'hr_inter.id',
        'hr_inter.full_name',
        'hr_inter.gender',
        'hr_inter.create_date',
        'hr_inter.interview_date',
        'hr_inter.birth_date',
        'hr_inter.id_number',
        'hr_inter.phone_number',
        'hr_inter.email',
        'hr_inter.tax_number',
        'hr_inter.synchronize',
        'hr_inter.employee_code',
        'hr_inter.applicant_status',
        'hr_inter.applicant_type',
        'hr_inter.team',
        'hr_inter.part',
        'hr_inter.production',
        'hr_inter.section',
        'hr_inter.job_field',
        'hr_inter.position'

      ])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('hr_inter.id', 'DESC');

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
  ): Promise<{ data: HrInter[]; total: number; totalPages: number }> {
    const query = this.hrInterRepository.createQueryBuilder('hr_inter');

    const addFilterCondition = (filterKey: string, dbField: string) => {
      if (filter[filterKey] && filter[filterKey].length > 0) {
        const conditions = filter[filterKey].map((value: any, index: any) => `${dbField} ILIKE :${filterKey}${index}`);
        filter[filterKey].forEach((value: any, index: any) => {
          query.setParameter(`${filterKey}${index}`, `%${value}%`);
        });
        query.andWhere(`(${conditions.join(' OR ')})`);
      }
    };

    addFilterCondition('nameTags', 'hr_inter.full_name');
    addFilterCondition('phoneNumberTags', 'hr_inter.phone_number');
    addFilterCondition('citizenshipIdTags', 'hr_inter.id_number');
    addFilterCondition('cid', 'hr_inter.employee_code');
    addFilterCondition('applicantType', 'hr_inter.applicant_type');
    addFilterCondition('applicantStatus', 'hr_inter.applicant_status');

    if (filter.interViewDateFilter) {
      query.andWhere('DATE(hr_inter.interview_date) = :interViewDateFilter', { interViewDateFilter: filter.interViewDateFilter });
    }

    if (startDate) {
      query.andWhere('hr_inter.create_date >= :startDate', { startDate });
    }
    if (endDate) {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      query.andWhere('hr_inter.create_date <= :endOfDay', { endOfDay });
    }

    if (filter.syn !== undefined) {
      query.andWhere('hr_inter.synchronize = :syn', { syn: filter.syn });
    }

    query
      .select([
        'hr_inter.id',
        'hr_inter.full_name',
        'hr_inter.gender',
        'hr_inter.create_date',
        'hr_inter.interview_date',
        'hr_inter.birth_date',
        'hr_inter.id_number',
        'hr_inter.phone_number',
        'hr_inter.email',
        'hr_inter.tax_number',
        'hr_inter.synchronize',
        'hr_inter.employee_code',
        'hr_inter.applicant_status',
        'hr_inter.applicant_type',
        'hr_inter.team',
        'hr_inter.part',
        'hr_inter.production',
        'hr_inter.section',
        'hr_inter.job_field',
        'hr_inter.position'
      ])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('hr_inter.id', 'DESC');

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }


  async remove(ids: number[]): Promise<void> {
    const BATCH_SIZE = 1000;
    const idBatches = [];
    for (let i = 0; i < ids.length; i += BATCH_SIZE) {
      idBatches.push(ids.slice(i, i + BATCH_SIZE));
    }

    await this.hrInterRepository.manager.transaction(async (transactionalEntityManager) => {
      for (const batch of idBatches) {
        await transactionalEntityManager.delete(this.hrInterRepository.target, { id: In(batch) });
      }
    });
  }



  async getPersonnelInterById(id: number): Promise<any> {
    const inter = await this.hrInterRepository.findOne({
      where: { id }
    });

    if (!inter) {
      return {
        status: false,
        data: [],
      };
    }

    return {
      status: true,
      data: {
        // Thông tin cá nhân
        key: inter.id,
        full_name: inter.full_name,
        gender: inter.gender,
        interview_date: inter.interview_date,
        start_date: inter.start_date,
        birth_date: inter.birth_date,
        id_number: inter.id_number,
        id_issue_date: inter.id_issue_date,
        ethnicity: inter.ethnicity,
        id_issue_place: inter.id_issue_place,
        insurance_number: inter.insurance_number,
        tax_number: inter.tax_number,
        phone_number: inter.phone_number,
        email: inter.email,
        alternate_phone_number: inter.alternate_phone_number,
        alternate_name: inter.alternate_name,
        alternate_relationship: inter.alternate_relationship,
        birth_address: inter.birth_address,
        birth_province: inter.birth_province,
        birth_district: inter.birth_district,
        birth_ward: inter.birth_ward,
        current_address: inter.current_address,
        current_province: inter.current_province,
        current_district: inter.current_district,
        current_ward: inter.current_ward,
        type_personnel: inter.type_personnel,
        introducer_department: inter.introducer_department,
        introducer_introducer_name: inter.introducer_introducer_name,
        introducer_phone_number: inter.introducer_phone_number,
        candidate_type: inter.candidate_type,
        supplier_details: inter.supplier_details,
        synchronize: inter.synchronize,
        fac: inter.fac,
        department: inter.department,
        team: inter.team,
        jop_position: inter.jop_position,
        type_of_degree: inter.type_of_degree,
        type_classify: inter.type_classify,
        employee_code: inter.employee_code,
        contract_term: inter.contract_term,
        line_model: inter.line_model,
        part: inter.part,
        // Thông tin vị trí và hợp đồng
        erp_department_registration: inter.erp_department_registration,
        production: inter.production,
        section: inter.section,
        job_field: inter.job_field,
        position: inter.position,
        entering_day: inter.entering_day,
        leaving_day: inter.leaving_day,
        probation_days: inter.probation_days,
        official_date_first: inter.official_date_first,
        official_date_second: inter.official_date_second,
        age: inter.age,
        month_count: inter.month_count,
        number_of_children: inter.number_of_children,
        applicant_status: inter.applicant_status,
        applicant_type: inter.applicant_type,
        status_form: inter.status_form,
        desired_base_salary: inter.desired_base_salary,
        desired_total_salary: inter.desired_total_salary,

        // Thông tin con cái
        children: [
          {
            id: 1,
            children_name: inter.children_name_1,
            children_birth_date: inter.children_birth_date_1,
            children_gender: inter.children_gender_1,
          },
          {
            id: 2,
            children_name: inter.children_name_2,
            children_birth_date: inter.children_birth_date_2,
            children_gender: inter.children_gender_2,
          },
          {
            id: 3,
            children_name: inter.children_name_3,
            children_birth_date: inter.children_birth_date_3,
            children_gender: inter.children_gender_3,
          },
        ],
        families: [
          {
            id: 1,
            relationship: "Bố",
            full_name: inter.father_name,
            phone_number: inter.father_phone_number,
          },
          {
            id: 2,
            relationship: "Mẹ",
            full_name: inter.mother_name,
            phone_number: inter.mother_phone_number,
          },
          {
            id: 3,
            relationship: "Vợ",
            full_name: inter.partner_name,
            phone_number: inter.partner_phone_number,
          },
        ],
        experiences: [
          {
            id: 1,
            tasks: inter.work_department_1,
            position: inter.work_responsibility_1,
            company_name: inter.company_name_1,
            start_date: inter.entrance_day_1,
            end_date: inter.leaving_day_1,
            salary: inter.salary_1
          },
          {
            id: 2,
            tasks: inter.work_department_2,
            position: inter.work_responsibility_2,
            company_name: inter.company_name_2,
            start_date: inter.entrance_day_2,
            end_date: inter.leaving_day_2,
            salary: inter.salary_2
          }
        ],
        educations:
          [
            {
              highest_education_level: inter.highest_education_level,
              school: inter.school_name,
              major: inter.major,
              school_year: inter.school_year,
              year_ended: inter.year_ended,
              year_of_graduation: inter.year_of_graduation,
              classification: inter.classification,
            }
          ],
        languages:
          [
            {
              id: 1,
              language: inter.language_1,
              certificate_type: inter.certificate_type_1,
              score: inter.score_1,
              level: inter.level_1,
            },
            {
              id: 2,
              language: inter.language_2,
              certificate_type: inter.certificate_type_2,
              score: inter.score_2,
              level: inter.level_2,
            },
            {
              id: 3,
              language: inter.language_3,
              certificate_type: inter.certificate_type_3,
              score: inter.score_3,
              level: inter.level_3,
            },

          ],
        distance_from_household_to_company: inter.distance_from_household_to_company,
        skills: [
          { id: 1, skill: 'Excel', level: inter.office_skill_excel },
          { id: 2, skill: 'Word', level: inter.office_skill_word },
          { id: 3, skill: 'PowerPoint', level: inter.office_skill_powerpoint },
          { id: 4, skill: 'Autocad', level: inter.software_skill_autocad },
          { id: 5, skill: 'SolidWorks', level: inter.software_skill_solidworks },
          { id: 6, skill: 'ERP', level: inter.software_skill_erp },
          { id: 7, skill: 'MES', level: inter.software_skill_mes },
        ]
      },
    };
  }


  async updateUserInterviewId(
    id: number,
    updateDto: Partial<HrInter>,
  ): Promise<HrInter> {
    await this.hrInterRepository.update(id, updateDto);
    return this.hrInterRepository.findOneBy({ id });
  }


  /*  async synchronizeHr(ids: number[]): Promise<void> {
     await this.hrInterRepository.update(
       { id: In(ids) },
       { synchronize: true }
     );
   } */

  async synchronizeHr(ids: number[]): Promise<void> {
    const personnels = await this.hrInterRepository.createQueryBuilder('p')
      .where('p.id IN (:...ids)', { ids })
      .andWhere('p.synchronize = false')
      .select([
        'p.full_name',
        'p.gender',
        'p.interview_date',
        'p.start_date',
        'p.birth_date',
        'p.id_number',
        'p.id_issue_date',
        'p.ethnicity',
        'p.id_issue_place',
        'p.insurance_number',
        'p.tax_number',
        'p.phone_number',
        'p.email',
        'p.alternate_phone_number',
        'p.alternate_name',
        'p.alternate_relationship',
        'p.birth_address',
        'p.birth_province',
        'p.birth_district',
        'p.birth_ward',
        'p.current_address',
        'p.current_province',
        'p.current_district',
        'p.current_ward',
        'p.type_personnel',
        'p.introducer_department',
        'p.introducer_introducer_name',
        'p.introducer_phone_number',
        'p.candidate_type',
        'p.supplier_details',
        'p.status_form',
        'p.fac',
        'p.department',
        'p.team',
        'p.jop_position',
        'p.type_of_degree',
        'p.type_classify',
        'p.employee_code',
        'p.contract_term',
        'p.line_model',
        'p.part',
        'p.erp_department_registration',
        'p.production',
        'p.section',
        'p.job_field',
        'p.position',
        'p.entering_day',
        'p.leaving_day',
        'p.probation_days',
        'p.official_date_first',
        'p.official_date_second',
        'p.age',
        'p.month_count',
        'p.partner_name',
        'p.partner_phone_number',
        'p.number_of_children',
        'p.children_name_1',
        'p.children_birth_date_1',
        'p.children_gender_1',
        'p.children_name_2',
        'p.children_birth_date_2',
        'p.children_gender_2',
        'p.children_name_3',
        'p.children_birth_date_3',
        'p.children_gender_3',
        'p.father_name',
        'p.father_phone_number',
        'p.mother_name',
        'p.mother_phone_number',
        'p.distance_from_household_to_company',
        'p.highest_education_level',
        'p.school_name',
        'p.major',
        'p.school_year',
        'p.year_ended',
        'p.year_of_graduation',
        'p.classification',
        'p.work_department_1',
        'p.work_responsibility_1',
        'p.company_name_1',
        'p.entrance_day_1',
        'p.leaving_day_1',
        'p.salary_1',
        'p.work_department_2',
        'p.work_responsibility_2',
        'p.company_name_2',
        'p.entrance_day_2',
        'p.leaving_day_2',
        'p.salary_2',
        'p.language_1',
        'p.certificate_type_1',
        'p.score_1',
        'p.level_1',
        'p.language_2',
        'p.certificate_type_2',
        'p.score_2',
        'p.level_2',
        'p.language_3',
        'p.certificate_type_3',
        'p.score_3',
        'p.level_3',
        'p.social_insurance',
        'p.applicant_status',
        'p.applicant_type',
        'p.office_skill_excel',
        'p.office_skill_word',
        'p.office_skill_powerpoint',
        'p.software_skill_autocad',
        'p.software_skill_solidworks',
        'p.software_skill_erp',
        'p.software_skill_mes',
        'p.desired_base_salary',
        'p.desired_total_salary',
      ])
      .groupBy('p.id')
      .orderBy('p.id')
      .getRawMany();

    if (!personnels || personnels.length === 0) {
      return;
    }
    const hrErpRecords = personnels.map((personnel) => ({
      full_name: personnel.p_full_name,
      gender: personnel.p_gender,
      interview_date: personnel.p_interview_date,
      start_date: personnel.p_start_date,
      birth_date: personnel.p_birth_date,
      id_number: personnel.p_id_number,
      id_issue_date: personnel.p_id_issue_date,
      ethnicity: personnel.p_ethnicity,
      id_issue_place: personnel.p_id_issue_place,
      insurance_number: personnel.p_insurance_number,
      tax_number: personnel.p_tax_number,
      phone_number: personnel.p_phone_number,
      email: personnel.p_email,
      alternate_phone_number: personnel.p_alternate_phone_number,
      alternate_name: personnel.p_alternate_name,
      alternate_relationship: personnel.p_alternate_relationship,
      birth_address: personnel.p_birth_address,
      birth_province: personnel.p_birth_province,
      birth_district: personnel.p_birth_district,
      birth_ward: personnel.p_birth_ward,
      current_address: personnel.p_current_address,
      current_province: personnel.p_current_province,
      current_district: personnel.p_current_district,
      current_ward: personnel.p_current_ward,
      type_personnel: personnel.p_type_personnel,
      introducer_department: personnel.p_introducer_department,
      introducer_introducer_name: personnel.p_introducer_introducer_name,
      introducer_phone_number: personnel.p_introducer_phone_number,
      candidate_type: personnel.p_candidate_type,
      supplier_details: personnel.p_supplier_details,
      status_form: personnel.p_status_form,
      fac: personnel.p_fac,
      department: personnel.p_department,
      team: personnel.p_team,
      jop_position: personnel.p_jop_position,
      type_of_degree: personnel.p_type_of_degree,
      type_classify: personnel.p_type_classify,
      employee_code: personnel.p_employee_code,
      contract_term: personnel.p_contract_term,
      line_model: personnel.p_line_model,
      part: personnel.p_part,
      erp_department_registration: personnel.p_erp_department_registration,
      production: personnel.p_production,
      section: personnel.p_section,
      job_field: personnel.p_job_field,
      position: personnel.p_position,
      entering_day: personnel.p_entering_day,
      leaving_day: personnel.p_leaving_day,
      probation_days: personnel.p_probation_days,
      official_date_first: personnel.p_official_date_first,
      official_date_second: personnel.p_official_date_second,
      age: personnel.p_age,
      month_count: personnel.p_month_count,
      partner_name: personnel.p_partner_name,
      partner_phone_number: personnel.p_partner_phone_number,
      number_of_children: personnel.p_number_of_children,
      children_name_1: personnel.p_children_name_1,
      children_birth_date_1: personnel.p_children_birth_date_1,
      children_gender_1: personnel.p_children_gender_1,
      children_name_2: personnel.p_children_name_2,
      children_birth_date_2: personnel.p_children_birth_date_2,
      children_gender_2: personnel.p_children_gender_2,
      children_name_3: personnel.p_children_name_3,
      children_birth_date_3: personnel.p_children_birth_date_3,
      children_gender_3: personnel.p_children_gender_3,
      father_name: personnel.p_father_name,
      father_phone_number: personnel.p_father_phone_number,
      mother_name: personnel.p_mother_name,
      mother_phone_number: personnel.p_mother_phone_number,
      distance_from_household_to_company: personnel.p_distance_from_household_to_company,
      highest_education_level: personnel.p_highest_education_level,
      school_name: personnel.p_school_name,
      major: personnel.p_major,
      school_year: personnel.p_school_year,
      year_ended: personnel.p_year_ended,
      year_of_graduation: personnel.p_year_of_graduation,
      classification: personnel.p_classification,
      work_department_1: personnel.p_work_department_1,
      work_responsibility_1: personnel.p_work_responsibility_1,
      company_name_1: personnel.p_company_name_1,
      entrance_day_1: personnel.p_entrance_day_1,
      leaving_day_1: personnel.p_leaving_day_1,
      salary_1: personnel.p_salary_1,
      work_department_2: personnel.p_work_department_2,
      work_responsibility_2: personnel.p_work_responsibility_2,
      company_name_2: personnel.p_company_name_2,
      entrance_day_2: personnel.p_entrance_day_2,
      leaving_day_2: personnel.p_leaving_day_2,
      salary_2: personnel.p_salary_2,
      language_1: personnel.p_language_1,
      certificate_type_1: personnel.p_certificate_type_1,
      score_1: personnel.p_score_1,
      level_1: personnel.p_level_1,
      language_2: personnel.p_language_2,
      certificate_type_2: personnel.p_certificate_type_2,
      score_2: personnel.p_score_2,
      level_2: personnel.p_level_2,
      language_3: personnel.p_language_3,
      certificate_type_3: personnel.p_certificate_type_3,
      score_3: personnel.p_score_3,
      level_3: personnel.p_level_3,
      social_insurance: personnel.p_social_insurance,
      applicant_status: personnel.p_applicant_status,
      applicant_type: personnel.p_applicant_type,
      office_skill_excel: personnel.p_office_skill_excel,
      office_skill_word: personnel.p_office_skill_word,
      office_skill_powerpoint: personnel.p_office_skill_powerpoint,
      software_skill_autocad: personnel.p_software_skill_autocad,
      software_skill_solidworks: personnel.p_software_skill_solidworks,
      software_skill_erp: personnel.p_software_skill_erp,
      software_skill_mes: personnel.p_software_skill_mes,
      desired_base_salary: personnel.p_desired_base_salary,
      desired_total_salary: personnel.p_desired_total_salary,
    }));
    await this.personnelRepository.save(hrErpRecords);
    await this.hrInterRepository.update(
      { id: In(ids) },
      { synchronize: true }
    );
  }


  async findByPhoneNumber(phone_number: string): Promise<any> {
    const personnel = await this.hrInterRepository.findOne({
      where: { phone_number }
    });

    if (!personnel) {
      return {
        success: false,
        message: 'Personnel not found with this phone number',
        redirectUrl: '/your-desired-url',
      };
    }

    const combinedInfo = `${personnel.id}:${personnel.phone_number}:${personnel.full_name}:${personnel.email}`;
    let encodedRouter = Buffer.from(combinedInfo).toString('base64');

    encodedRouter = encodedRouter
      .replace(/\+/g, 'A')
      .replace(/\//g, 'B').replace(/=+$/, '');
    return {
      success: true,
      data: {
        id: personnel.id,
        phoneNumber: personnel.phone_number,
        name: personnel.full_name,
        email: personnel.email,
        status_form: personnel.status_form,
        router: encodedRouter,
      },
    };
  }
}
