// src/import/services/import.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ImportDataDto } from '../dto/import.dto';
import { CreatePersonnelDto } from '../dto/hr_personnel.dto';
import { CreateEducationDto } from '../dto/hr_education.dto';
import { HrInterviewCandidateDTO } from '../dto/hr_interview_candidates.dto';
import { CreateHrInterDto } from '../dto/hr_inter.dto';

@Injectable()
export class ImportServices {
    private readonly logger = new Logger(ImportServices.name);

    constructor(private entityManager: EntityManager) { }

    async processImportData(data: ImportDataDto): Promise<void> {
        const { method, model, data: importData } = data;

        if (method !== 'execute_import') {
            throw new Error('Phương thức không hợp lệ');
        }

        switch (model) {
            case 'hr_personnel':
                await this.processHRPersonnelData(importData, 'hr_personnel');
                break;
            case 'hr_personnel,hr_language,hr_family,hr_experience,hr_education':
                await this.processHRPersonnelDatas(importData, 'hr_personnel,hr_language,hr_family,hr_experience,hr_education');
                break;
            case 'hr_interview_candidates':
                await this.processHRInterviewCandidates(importData, 'hr_interview_candidates');
                break;
            case 'hr_inter':
                await this.processHRInter(importData, 'hr_inter');
                break;
            default:
                throw new NotFoundException(`Model ${model} không được hỗ trợ`);
        }
    }



    private async processHRPersonnelData(importData: any[], tableName: string): Promise<void> {
        const batchSize = 1000;
        const totalBatches = Math.ceil(importData.length / batchSize);

        for (let i = 0; i < totalBatches; i++) {
            const batch = importData.slice(i * batchSize, (i + 1) * batchSize);

            const validBatch: CreatePersonnelDto[] = batch.map(record => {
                return {
                    full_name: record.full_name,
                    gender: record.gender,
                    interview_date: record.interview_date,
                    start_date: record.start_date,
                    birth_date: record.birth_date,
                    id_number: record.id_number,
                    id_issue_date: record.id_issue_date,
                    ethnicity: record.ethnicity,
                    id_issue_place: record.id_issue_place,
                    insurance_number: record.insurance_number,
                    tax_number: record.tax_number,
                    phone_number: record.phone_number,
                    email: record.email,
                    alternate_phone_number: record.alternate_phone_number,
                    alternate_name: record.alternate_name,
                    alternate_relationship: record.alternate_relationship,
                    birth_address: record.birth_address,
                    birth_province: record.birth_province,
                    birth_district: record.birth_district,
                    birth_ward: record.birth_ward,
                    current_address: record.current_address,
                    current_province: record.current_province,
                    current_district: record.current_district,
                    current_ward: record.current_ward,
                    type_personnel: record.type_personnel,
                    candidate_type: record.candidate_type,
                    supplier_details: record.supplier_details,
                    introducer_department: record.introducer_department,
                    introducer_introducer_name: record.introducer_introducer_name,
                    introducer_phone_number: record.introducer_phone_number,
                    fac: record.fac,
                    department: record.department,
                    team: record.team,
                    jop_position: record.jop_position,
                    type_of_degree: record.type_of_degree,
                    type_classify: record.type_classify,
                    employee_code: record.employee_code,
                    contract_term: record.contract_term,
                    line_model: record.line_model,
                    part: record.part,
                    erp_department_registration: record.erp_department_registration,
                    production: record.production,
                    section: record.section,
                    job_field: record.job_field,
                    position: record.position,
                    entering_day: record.entering_day,
                    leaving_day: record.leaving_day,
                    probation_days: record.probation_days,
                    official_date_first: record.official_date_first,
                    official_date_second: record.official_date_second,
                    age: record.age,
                    month_count: record.month_count,
                    partner_name: record.partner_name,
                    partner_phone_number: record.partner_phone_number,
                    number_of_children: record.number_of_children,
                    children_name_1: record.children_name_1,
                    children_birth_date_1: record.children_birth_date_1,
                    children_gender_1: record.children_gender_1,
                    children_name_2: record.children_name_2,
                    children_birth_date_2: record.children_birth_date_2,
                    children_gender_2: record.children_gender_2,
                    children_name_3: record.children_name_3,
                    children_birth_date_3: record.children_birth_date_3,
                    children_gender_3: record.children_gender_3,
                    father_name: record.father_name,
                    father_phone_number: record.father_phone_number,
                    mother_name: record.mother_name,
                    mother_phone_number: record.mother_phone_number,
                    distance_from_household_to_company: record.distance_from_household_to_company,
                    highest_education_level: record.highest_education_level,
                    school_name: record.school_name,
                    major: record.major,
                    school_year: record.school_year,
                    year_ended: record.year_ended,
                    year_of_graduation: record.year_of_graduation,
                    classification: record.classification,
                    company_name_1: record.company_name_1,
                    entrance_day_1: record.entrance_day_1,
                    leaving_day_1: record.leaving_day_1,
                    work_department_1: record.work_department_1,
                    work_responsibility_1: record.work_responsibility_1,
                    salary_1: record.salary_1,
                    company_name_2: record.company_name_2,
                    entrance_day_2: record.entrance_day_2,
                    leaving_day_2: record.leaving_day_2,
                    work_department_2: record.work_department_2,
                    work_responsibility_2: record.work_responsibility_2,
                    salary_2: record.salary_2,
                    social_insurance: record.social_insurance,

                    /*  */
                    language_1: record.language_1,
                    certificate_type_1: record.certificate_type_1,
                    score_1: record.score_1,
                    level_1: record.level_1,
                    /*  */
                    language_2: record.language_2,
                    certificate_type_2: record.certificate_type_2,
                    score_2: record.score_2,
                    level_2: record.level_2,
                    /*  */
                    language_3: record.language_3,
                    certificate_type_3: record.certificate_type_3,
                    score_3: record.score_3,
                    level_3: record.level_3,


                } as CreatePersonnelDto;
            }).filter(record => record.full_name !== undefined);

            if (validBatch.length === 0) {
                continue;
            }

            const employeeCodes = validBatch.map(record => `'${record.employee_code}'`).join(", ");

            const existingRecords = await this.entityManager.query(
                `SELECT employee_code FROM ${tableName} WHERE employee_code IN (${employeeCodes})`
            );

            if (existingRecords.length > 0) {
                const duplicateEmployeeCodes = existingRecords.map((record: any) => record.employee_code).join(", ");
                this.logger.error(`Duplicate employee codes found: ${duplicateEmployeeCodes}`);
                throw new Error(`Duplicate employee codes detected: ${duplicateEmployeeCodes}`);
            }
            await this.saveBatchToTable(validBatch, tableName);
        }
    }


    private async saveBatchToTable(batch: Record<string, any>[], tableName: string): Promise<number[]> {
        const values: string[] = batch.map((record) => {
            const filteredColumnsAndValues = Object.keys(record).reduce((acc, col) => {
                const value = record[col];
                if (value !== undefined) {
                    acc.columns.push(col);

                    if (value === '') {
                        acc.values.push('NULL');
                    } else {
                        acc.values.push(`'${value}'`);
                    }
                }
                return acc;
            }, { columns: [], values: [] } as { columns: string[], values: string[] });

            if (filteredColumnsAndValues.columns.length === 0) return '';

            return `(${filteredColumnsAndValues.values.join(', ')})`;
        }).filter(value => value.trim() !== '');

        if (values.length === 0) {
            this.logger.warn(`No valid records to insert into ${tableName}`);
            return [];
        }

        const finalColumns = Object.keys(batch[0]).reduce((acc, col) => {
            const value = batch[0][col];
            if (value !== undefined) {
                acc.push(col);
            }
            return acc;
        }, [] as string[]);

        const finalQuery = `INSERT INTO ${tableName} (${finalColumns.join(', ')}) VALUES ` + values.join(', ') + ' RETURNING id';

        try {
            const result = await this.entityManager.query(finalQuery);
            const personnelIds = result.map((row: { id: number }) => row.id);
            return personnelIds;
        } catch (error) {
            this.logger.error(`Error inserting data into table ${tableName}`, error);
            throw new NotFoundException(`Unable to insert data into table ${tableName}`);
        }
    }






    private async saveInterviewResults(personnelIds: number[]): Promise<void> {
        const interviewEntities = personnelIds.map(personnelId => ({
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
            personnel_id: { id: personnelId },
        }));

        const insertQuery = `INSERT INTO hr_interview_results (personnel_id, interview_result, recruitment_department, position, interviewer_name, appearance_criteria, height, criminal_record, education_level, reading_writing, calculation_ability) VALUES `;

        const values: string[] = interviewEntities.map(entity => {
            return `(
                ${entity.personnel_id.id},
                ${entity.interview_result ? 'TRUE' : 'FALSE'},
                '${entity.recruitment_department ?? ''}',
                '${entity.position ?? ''}',
                '${entity.interviewer_name ?? ''}',
                '${entity.appearance_criteria ?? ''}',
                '${entity.height ?? ''}',
                '${entity.criminal_record ?? ''}',
                '${entity.education_level ?? ''}',
                '${entity.reading_writing ?? ''}',
                '${entity.calculation_ability ?? ''}'
            )`;
        });

        const finalQuery = insertQuery + values.join(', ');
        try {
            await this.entityManager.query(finalQuery);
            this.logger.log(`Đã ghi ${interviewEntities.length} bản ghi vào bảng hr_interview_results`);
        } catch (error) {
            this.logger.error(`Lỗi khi ghi dữ liệu vào bảng hr_interview_results`, error);
            throw new NotFoundException(`Không thể ghi dữ liệu vào bảng hr_interview_results`);
        }
    }

    private async processHRPersonnelDatas(importData: Array<{ [key: string]: any }>, tableNames: string): Promise<void> {
        const batchSize = 1000;
        const totalBatches = Math.ceil(importData.length / batchSize);
        const tables = tableNames.split(',');

        for (let i = 0; i < totalBatches; i++) {
            const batch = importData.slice(i * batchSize, (i + 1) * batchSize);
            const dataToSave: { [key: string]: Array<any> } = {};

            batch.forEach(record => {
                tables.forEach(table => {
                    if (!dataToSave[table]) {
                        dataToSave[table] = [];
                    }

                    switch (table) {
                        case 'hr_personnel':
                            if (record.full_name !== undefined && record.gender !== undefined) {
                                dataToSave[table].push({
                                    full_name: record.full_name,
                                    gender: record.gender,
                                    interview_date: record.interview_date,
                                    start_date: record.start_date,
                                    birth_date: record.birth_date,
                                    id_number: record.id_number,
                                    id_issue_date: record.id_issue_date,
                                    ethnicity: record.ethnicity,
                                    id_issue_place: record.id_issue_place,
                                    insurance_number: record.insurance_number,
                                    tax_number: record.tax_number,
                                    phone_number: record.phone_number,
                                    email: record.email,
                                    alternate_phone_number: record.alternate_phone_number,
                                    alternate_name: record.alternate_name,
                                    alternate_relationship: record.alternate_relationship,
                                    birth_address: record.birth_address,
                                    birth_province: record.birth_province,
                                    birth_district: record.birth_district,
                                    birth_ward: record.birth_ward,
                                    current_address: record.current_address,
                                    current_province: record.current_province,
                                    current_district: record.current_district,
                                    current_ward: record.current_ward,
                                    type_personnel: record.type_personnel ?? true,
                                } as CreatePersonnelDto);
                            }
                            break;

                        case 'hr_language':
                            // Handle hr_language data processing here
                            break;

                        case 'hr_family':
                            // Handle hr_family data processing here
                            break;

                        case 'hr_experience':
                            // Handle hr_experience data processing here
                            break;

                        case 'hr_education':
                            if (record.school || record.major || record.years || record.start_year || record.graduation_year || record.grade) {
                                dataToSave[table].push({
                                    school: record.school,
                                    major: record.major,
                                    years: record.years,
                                    start_year: record.start_year,
                                    graduation_year: record.graduation_year,
                                    grade: record.grade,
                                } as CreateEducationDto);
                            }
                            break;

                    }
                });
            });

            // Save data for each table
            for (const table of tables) {
                const validBatch = dataToSave[table];
                if (validBatch && validBatch.length > 0) {
                    console.log("Table:", table);
                    console.log("Data to save:", validBatch);
                    // Call your save function here, e.g., await saveData(table, validBatch);
                }
            }
        }
    }





    private async processHRInterviewCandidates(importData: any[], tableName: string): Promise<void> {
        const batchSize = 1000;
        const totalBatches = Math.ceil(importData.length / batchSize);

        // Truy vấn để lấy danh sách số điện thoại đã tồn tại trong bảng
        const existingPhoneNumbers = await this.getExistingPhoneNumbers(tableName);

        for (let i = 0; i < totalBatches; i++) {
            const batch = importData.slice(i * batchSize, (i + 1) * batchSize);

            const validBatch: HrInterviewCandidateDTO[] = batch.map(record => {
                return {
                    full_name: record.full_name,
                    gender: record.gender,
                    phone_number: record.phone_number,
                    current_residence: record.current_residence,
                    birth_year: record.birth_year,
                    hometown: record.hometown,
                    contractor: record.contractor,
                    job_position: record.job_position,
                    email: record.email,
                    id_card_number: record.id_card_number,
                    interview_date: record.interview_date,
                } as HrInterviewCandidateDTO;
            }).filter(record => record.full_name !== undefined && record.gender !== undefined);

            // Kiểm tra tính duy nhất của số điện thoại
            const filteredBatch = validBatch.filter(record => {
                return record.phone_number && !existingPhoneNumbers.has(record.phone_number);
            });

            if (filteredBatch.length === 0) {
                continue; // Nếu không có bản ghi hợp lệ sau khi lọc, bỏ qua
            }

            await this.saveBatchToTableHrInterviewCandidates(filteredBatch, tableName);
        }
    }

    // Hàm để lấy danh sách số điện thoại đã tồn tại trong bảng
    private async getExistingPhoneNumbers(tableName: string): Promise<Set<string>> {
        const query = `SELECT phone_number FROM ${tableName}`;
        const results = await this.entityManager.query(query);
        const phoneNumbers = new Set<string>();

        results.forEach((row: { phone_number: string }) => {
            if (row.phone_number) {
                phoneNumbers.add(row.phone_number);
            }
        });

        return phoneNumbers;
    }


    private async saveBatchToTableHrInterviewCandidates(batch: HrInterviewCandidateDTO[], tableName: string): Promise<number[]> {
        const insertQuery = `INSERT INTO ${tableName} (full_name, gender, phone_number, current_residence, birth_year, hometown, contractor, job_position, email, id_card_number, interview_date) VALUES `;

        const values: string[] = batch.map((record) => {
            return `(
                '${record.full_name ?? ''}', 
                '${record.gender ?? ''}', 
                '${record.phone_number ?? ''}', 
                '${record.current_residence ?? ''}', 
                ${record.birth_year ?? 'NULL'}, 
                '${record.hometown ?? ''}', 
                '${record.contractor ?? ''}', 
                '${record.job_position ?? ''}', 
                '${record.email ?? ''}', 
                '${record.id_card_number ?? ''}'
            )`;
        });

        const finalQuery = insertQuery + values.join(', ') + ' RETURNING id';

        try {
            const result = await this.entityManager.query(finalQuery);

            const ids = result.map((row: { id: number }) => row.id);
            return ids;
        } catch (error) {
            throw new NotFoundException(`Không thể ghi dữ liệu vào bảng ${tableName}`);
        }
    }

    private async processHRInter(importData: any[], tableName: string): Promise<void> {
        const batchSize = 1000;
        const totalBatches = Math.ceil(importData.length / batchSize);

        for (let i = 0; i < totalBatches; i++) {
            const batch = importData.slice(i * batchSize, (i + 1) * batchSize);

            const validBatch: CreateHrInterDto[] = batch.map(record => {
                return {
                    full_name: record.full_name,
                    gender: record.gender,
                    interview_date: record.interview_date,
                    start_date: record.start_date,
                    birth_date: record.birth_date,
                    id_number: record.id_number,
                    id_issue_date: record.id_issue_date,
                    ethnicity: record.ethnicity,
                    id_issue_place: record.id_issue_place,
                    insurance_number: record.insurance_number,
                    tax_number: record.tax_number,
                    phone_number: record.phone_number,
                    email: record.email,
                    alternate_phone_number: record.alternate_phone_number,
                    alternate_name: record.alternate_name,
                    alternate_relationship: record.alternate_relationship,
                    birth_address: record.birth_address,
                    birth_province: record.birth_province,
                    birth_district: record.birth_district,
                    birth_ward: record.birth_ward,
                    current_address: record.current_address,
                    current_province: record.current_province,
                    current_district: record.current_district,
                    current_ward: record.current_ward,
                    type_personnel: record.type_personnel,
                    candidate_type: record.candidate_type,
                    supplier_details: record.supplier_details,
                    introducer_department: record.introducer_department,
                    introducer_introducer_name: record.introducer_introducer_name,
                    introducer_phone_number: record.introducer_phone_number,
                    fac: record.fac,
                    department: record.department,
                    team: record.team,
                    jop_position: record.jop_position,
                    type_of_degree: record.type_of_degree,
                    type_classify: record.type_classify,
                    employee_code: record.employee_code,
                    contract_term: record.contract_term,
                    line_model: record.line_model,
                    part: record.part,
                    erp_department_registration: record.erp_department_registration,
                    production: record.production,
                    section: record.section,
                    job_field: record.job_field,
                    position: record.position,
                    entering_day: record.entering_day,
                    leaving_day: record.leaving_day,
                    probation_days: record.probation_days,
                    official_date_first: record.official_date_first,
                    official_date_second: record.official_date_second,
                    age: record.age,
                    month_count: record.month_count,
                    partner_name: record.partner_name,
                    partner_phone_number: record.partner_phone_number,
                    number_of_children: record.number_of_children,
                    children_name_1: record.children_name_1,
                    children_birth_date_1: record.children_birth_date_1,
                    children_gender_1: record.children_gender_1,
                    children_name_2: record.children_name_2,
                    children_birth_date_2: record.children_birth_date_2,
                    children_gender_2: record.children_gender_2,
                    children_name_3: record.children_name_3,
                    children_birth_date_3: record.children_birth_date_3,
                    children_gender_3: record.children_gender_3,
                    father_name: record.father_name,
                    father_phone_number: record.father_phone_number,
                    mother_name: record.mother_name,
                    mother_phone_number: record.mother_phone_number,
                    distance_from_household_to_company: record.distance_from_household_to_company,
                    highest_education_level: record.highest_education_level,
                    school_name: record.school_name,
                    major: record.major,
                    school_year: record.school_year,
                    year_ended: record.year_ended,
                    year_of_graduation: record.year_of_graduation,
                    classification: record.classification,
                    company_name_1: record.company_name_1,
                    entrance_day_1: record.entrance_day_1,
                    leaving_day_1: record.leaving_day_1,
                    work_department_1: record.work_department_1,
                    work_responsibility_1: record.work_responsibility_1,
                    salary_1: record.salary_1,
                    company_name_2: record.company_name_2,
                    entrance_day_2: record.entrance_day_2,
                    leaving_day_2: record.leaving_day_2,
                    work_department_2: record.work_department_2,
                    work_responsibility_2: record.work_responsibility_2,
                    salary_2: record.salary_2,
                    social_insurance: record.social_insurance,

                    /*  */
                    language_1: record.language_1,
                    certificate_type_1: record.certificate_type_1,
                    score_1: record.score_1,
                    level_1: record.level_1,
                    /*  */
                    language_2: record.language_2,
                    certificate_type_2: record.certificate_type_2,
                    score_2: record.score_2,
                    level_2: record.level_2,
                    /*  */
                    language_3: record.language_3,
                    certificate_type_3: record.certificate_type_3,
                    score_3: record.score_3,
                    level_3: record.level_3,


                    applicant_status: record.applicant_status,
                    applicant_type: record.applicant_type,
                    desired_base_salary: record.desired_base_salary,
                    desired_total_salary: record.desired_total_salary,


                } as CreateHrInterDto;
            }).filter(record => record.full_name !== undefined);

            if (validBatch.length === 0) {
                continue;
            }

            const employeeCodes = validBatch.map(record => `'${record.phone_number}'`).join(", ");

            const existingRecords = await this.entityManager.query(
                `SELECT phone_number FROM ${tableName} WHERE phone_number IN (${employeeCodes})`
            );

            if (existingRecords.length > 0) {
                const duplicateEmployeeCodes = existingRecords.map((record: any) => record.phone_number).join(", ");
                this.logger.error(`Duplicate phone number found: ${duplicateEmployeeCodes}`);
                throw new Error(`Duplicate phone number found: ${duplicateEmployeeCodes}`);
            }
            await this.saveBatchInter(validBatch, tableName);
        }
    }


    private async saveBatchInter(batch: Record<string, any>[], tableName: string): Promise<number[]> {
        const values: string[] = batch.map((record) => {
            const filteredColumnsAndValues = Object.keys(record).reduce((acc, col) => {
                const value = record[col];
                if (value !== undefined) {
                    acc.columns.push(col);

                    if (value === '') {
                        acc.values.push('NULL');
                    } else {
                        acc.values.push(`'${value}'`);
                    }
                }
                return acc;
            }, { columns: [], values: [] } as { columns: string[], values: string[] });

            if (filteredColumnsAndValues.columns.length === 0) return '';

            return `(${filteredColumnsAndValues.values.join(', ')})`;
        }).filter(value => value.trim() !== '');

        if (values.length === 0) {
            this.logger.warn(`No valid records to insert into ${tableName}`);
            return [];
        }

        const finalColumns = Object.keys(batch[0]).reduce((acc, col) => {
            const value = batch[0][col];
            if (value !== undefined) {
                acc.push(col);
            }
            return acc;
        }, [] as string[]);

        const finalQuery = `INSERT INTO ${tableName} (${finalColumns.join(', ')}) VALUES ` + values.join(', ') + ' RETURNING id';

        try {
            const result = await this.entityManager.query(finalQuery);
            const personnelIds = result.map((row: { id: number }) => row.id);
            return personnelIds;
        } catch (error) {
            this.logger.error(`Error inserting data into table ${tableName}`, error);
            throw new NotFoundException(`Unable to insert data into table ${tableName}`);
        }
    }



}    
