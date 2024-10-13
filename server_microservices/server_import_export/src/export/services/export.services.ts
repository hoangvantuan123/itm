
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
@Injectable()
export class ExportServices {
    constructor(
        @Inject(Connection) private readonly connection: Connection,
    ) { }
    private getColumnMappingsForTable(table: string): { [key: string]: string } {
        const columnMappings: { [key: string]: { [key: string]: string } } = {
            'hr_personnel': {
                "employee_code": "CID",
                "full_name": "Name",
                "erp_department_registration": "Đăng ký bp trên ERP",
                "team": "Team",
                "part": "Part",
                "production": "Production",
                "section": "Section",
                "job_field": "Job field",
                "position": "Position",
                "entering_day": "Entering day",
                "leaving_day": "Leaving day",
                "probation_days": "PROBATION (day)",
                "official_date_first": "Ngày ký HĐ lần 1",
                "official_date_second": "Ngày ký HĐ lần 2",
                "id_number": "CCCD",
                "id_issue_date": "Ngày cấp",
                "id_issue_place": "Nơi cấp",
                "birth_date": "Date of birth",
                "age": "Tuổi",
                "month_count": "Đếm tháng",
                "phone_number": "Phone Number",
                "gender": "Gender",
                "email": "Email",
                "partner_name": "Partner name",
                "partner_phone_number": "Partner phone number",
                "number_of_children": "Số con",
                "children_name_1": "Children name 1",
                "children_birth_date_1": "Children birth date 1",
                "children_gender_1": "Children gender 1",
                "children_name_2": "Children name 2",
                "children_birth_date_2": "Children birth date 2",
                "children_gender_2": "Children gender 2",
                "children_name_3": "Children name 3",
                "children_birth_date_3": "Children birth date 3",
                "children_gender_3": "Children gender 3",
                "father_name": "Father name",
                "father_phone_number": "Father phone number",
                "mother_name": "Mother name",
                "mother_phone_number": "Mother phone number",
                "birth_ward": "Xã 1",
                "birth_district": "Huyện 1",
                "birth_province": "Tỉnh 1",
                "current_address": "Địa chỉ đăng ký hộ khẩu",
                "current_ward": "Xã 2",
                "current_district": "Huyện 2",
                "current_province": "Tỉnh 2",
                "birth_address": "Địa chỉ quê quán",
                "distance_from_household_to_company": "Khoảng cách từ nơi đăng ký hộ khẩu đến công ty",
                "highest_education_level": "Highest level of education",
                "school_name": "School name",
                "major": "Major",
                "company_name_1": "Company name 1",
                "entrance_day_1": "Entrance day 1",
                "leaving_day_1": "Leaving day 1",
                "work_department_1": "Working department 1",
                "work_responsibility_1": "Work responsibility 1",
                "company_name_2": "Company name 2",
                "entrance_day_2": "Entrance day 2",
                "leaving_day_2": "Leaving day 2",
                "work_department_2": "Working department 2",
                "work_responsibility_2": "Work responsibility 2",
                "ethnicity": "Dân tộc",
                "social_insurance": "ĐÓNG BHXH",
                "interview_date": "Interview date",
                "start_date": "Start date",
                "school_year": "School year",
                "year_ended": "Year ended",
                "year_of_graduation": "Year of graduation",
                "classification": "Classification",
                "salary_2": "Salary 2",
                "salary_1": "Salary 1",
                "language_1": "Language 1",
                "certificate_type_1": "Certificate Type 1",
                "score_1": "Score 1",
                "level_1": "Level 1",
                "language_2": "Language 2",
                "certificate_type_2": "Certificate Type 2",
                "score_2": "Score 2",
                "level_2": "Level 2",
                "language_3": "Language 3",
                "certificate_type_3": "Certificate Type 3",
                "score_3": "Score 3",
                "level_3": "Level 3",
                "office_skill_excel": "Office skill excel",
                "office_skill_word": "Office skill word",
                "office_skill_powerpoint": "Office skill powerpoint",
                "software_skill_autocad": "Software skill autocad",
                "software_skill_solidworks": "Software skill solidworks",
                "software_skill_erp": "Software skill erp",
                "software_skill_mes": "Software skill mes",
            },
            'hr_inter': {
                "employee_code": "CID",
                "full_name": "Name",
                "erp_department_registration": "Đăng ký bp trên ERP",
                "team": "Team",
                "part": "Part",
                "production": "Production",
                "section": "Section",
                "job_field": "Job field",
                "position": "Position",
                "entering_day": "Entering day",
                "leaving_day": "Leaving day",
                "probation_days": "PROBATION (day)",
                "official_date_first": "Ngày ký HĐ lần 1",
                "official_date_second": "Ngày ký HĐ lần 2",
                "id_number": "CCCD",
                "id_issue_date": "Ngày cấp",
                "id_issue_place": "Nơi cấp",
                "birth_date": "Date of birth",
                "age": "Tuổi",
                "month_count": "Đếm tháng",
                "phone_number": "Phone Number",
                "gender": "Gender",
                "email": "Email",
                "partner_name": "Partner name",
                "partner_phone_number": "Partner phone number",
                "number_of_children": "Số con",
                "children_name_1": "Children name 1",
                "children_birth_date_1": "Children birth date 1",
                "children_gender_1": "Children gender 1",
                "children_name_2": "Children name 2",
                "children_birth_date_2": "Children birth date 2",
                "children_gender_2": "Children gender 2",
                "children_name_3": "Children name 3",
                "children_birth_date_3": "Children birth date 3",
                "children_gender_3": "Children gender 3",
                "father_name": "Father name",
                "father_phone_number": "Father phone number",
                "mother_name": "Mother name",
                "mother_phone_number": "Mother phone number",
                "birth_ward": "Xã 1",
                "birth_district": "Huyện 1",
                "birth_province": "Tỉnh 1",
                "current_address": "Địa chỉ đăng ký hộ khẩu",
                "current_ward": "Xã 2",
                "current_district": "Huyện 2",
                "current_province": "Tỉnh 2",
                "birth_address": "Địa chỉ quê quán",
                "distance_from_household_to_company": "Khoảng cách từ nơi đăng ký hộ khẩu đến công ty",
                "highest_education_level": "Highest level of education",
                "school_name": "School name",
                "major": "Major",
                "company_name_1": "Company name 1",
                "entrance_day_1": "Entrance day 1",
                "leaving_day_1": "Leaving day 1",
                "work_department_1": "Working department 1",
                "work_responsibility_1": "Work responsibility 1",
                "company_name_2": "Company name 2",
                "entrance_day_2": "Entrance day 2",
                "leaving_day_2": "Leaving day 2",
                "work_department_2": "Working department 2",
                "work_responsibility_2": "Work responsibility 2",
                "ethnicity": "Dân tộc",
                "social_insurance": "ĐÓNG BHXH",
                "interview_date": "Interview date",
                "start_date": "Start date",
                "school_year": "School year",
                "year_ended": "Year ended",
                "year_of_graduation": "Year of graduation",
                "classification": "Classification",
                "salary_2": "Salary 2",
                "salary_1": "Salary 1",
                "language_1": "Language 1",
                "certificate_type_1": "Certificate Type 1",
                "score_1": "Score 1",
                "level_1": "Level 1",
                "language_2": "Language 2",
                "certificate_type_2": "Certificate Type 2",
                "score_2": "Score 2",
                "level_2": "Level 2",
                "language_3": "Language 3",
                "certificate_type_3": "Certificate Type 3",
                "score_3": "Score 3",
                "level_3": "Level 3",
                "office_skill_excel": "Office skill excel",
                "office_skill_word": "Office skill word",
                "office_skill_powerpoint": "Office skill powerpoint",
                "software_skill_autocad": "Software skill autocad",
                "software_skill_solidworks": "Software skill solidworks",
                "software_skill_erp": "Software skill erp",
                "software_skill_mes": "Software skill mes",
            },
            'another_table': {
                'id': 'Record ID',
                'description': 'Description',
                'created_at': 'Created At',
            }
        };

        return columnMappings[table] || {};
    }

    async findAllByTableAndFilter(
        table: string,
        filter: Record<string, any> = {},
        startDate?: Date,
        endDate?: Date,
        ids?: number[],
    ): Promise<any[]> {
        const query = this.connection.createQueryBuilder();
        const columnMappings = this.getColumnMappingsForTable(table);

        if (!Object.keys(columnMappings).length) {
            throw new Error(`No column mappings defined for table: ${table}`);
        }

        const selectedColumns = Object.keys(columnMappings).map(column => `${table}.${column} AS "${columnMappings[column]}"`);
        query.select(selectedColumns).from(table, table);

        const filterConditions: string[] = [];
        const filterParameters: Record<string, any> = {};



        const addLikeConditions = (field: string, tags: any[]) => {
            if (tags && tags.length > 0) {
                const conditions = tags.map((tag: any, index: number) => `${table}.${field} ILIKE :${field}${index}`).join(' OR ');
                filterConditions.push(`(${conditions})`);
                tags.forEach((tag: any, index: number) => {
                    filterParameters[`${field}${index}`] = `%${tag}%`;
                });
            }
        };
        if (filter.interviewDate) {
            filterConditions.push(`${table}.interview_date = :interViewDate`);
            filterParameters.interViewDate = filter.interviewDate;
        }
        addLikeConditions('full_name', filter.nameTags);
        addLikeConditions('phone_number', filter.phoneNumberTags);
        addLikeConditions('id_number', filter.citizenshipIdTags);
        addLikeConditions('employee_code', filter.cid);
        addLikeConditions('applicant_type', filter.applicantType);
        addLikeConditions('applicant_status', filter.applicantStatus);

        if (startDate) {
            filterConditions.push(`${table}.create_date >= :startDate`);
            filterParameters.startDate = startDate;
        }

        if (endDate) {
            const endOfDay = new Date(endDate);
            endOfDay.setHours(23, 59, 59, 999);
            filterConditions.push(`${table}.create_date <= :endOfDay`);
            filterParameters.endOfDay = endOfDay;
        }
        if (ids && ids.length > 0) {
            filterConditions.push(`${table}.id IN (:...ids)`);
            filterParameters.ids = ids;
        }
        if (filter.syn !== undefined) {
            filterConditions.push(`${table}.synchronize = :syn`);
            filterParameters.syn = filter.syn;
        }

        if (filterConditions.length > 0) {
            query.andWhere(filterConditions.join(' AND '));
        }
        query.setParameters(filterParameters);
        query.orderBy(`${table}.id`, 'DESC');

        const data = await query.getRawMany();

        return data;
    }

}
