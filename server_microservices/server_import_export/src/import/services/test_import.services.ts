import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ImportDataDto } from '../dto/import.dto';
import { CreatePersonnelDto } from '../dto/hr_personnel.dto';

@Injectable()
export class TestImportServices {
    private readonly logger = new Logger(TestImportServices.name);

    constructor(private entityManager: EntityManager) { }

    async testImportData(data: ImportDataDto): Promise<void> {
        const { method, model, data: importData } = data;

        if (method !== 'execute_import') {
            throw new Error('Phương thức không hợp lệ');
        }

        switch (model) {
            case 'hr_personnel':
                await this.validateHRPersonnelData(importData);
                break;
            case 'hr_personnel,hr_language,hr_family,hr_experience,hr_education':
                await this.processHRPersonnelDatas(importData, 'hr_personnel,hr_language,hr_family,hr_experience,hr_education');
                break;
            default:
                throw new NotFoundException(`Model ${model} không được hỗ trợ`);
        }
    }

    // Phương thức validateHRPersonnelData để kiểm tra dữ liệu nhập
    private async validateHRPersonnelData(importData: any[]): Promise<void> {
        const batchSize = 1000;
        const totalBatches = Math.ceil(importData.length / batchSize);

        for (let i = 0; i < totalBatches; i++) {
            const batch = importData.slice(i * batchSize, (i + 1) * batchSize);

            // Lọc các bản ghi hợp lệ
            const validBatch = batch.filter(record => this.isValidPersonnelRecord(record));

            if (validBatch.length === 0) {
                this.logger.warn(`Không có bản ghi hợp lệ trong batch số ${i + 1}`);
                continue;
            }

            this.logger.log(`Đã kiểm tra ${validBatch.length} bản ghi hợp lệ trong batch số ${i + 1}`);
        }
    }

    private isValidPersonnelRecord(record: any): boolean {
        if (!record.full_name || !['Male', 'Female', 'Other'].includes(record.gender)) {
            throw new Error(`Bản ghi không hợp lệ: cần có trường full_name và gender hợp lệ.`);
        }

        this.validateDateField(record.interview_date, 'interview_date');
        this.validateDateField(record.start_date, 'start_date');
        this.validateDateField(record.birth_date, 'birth_date');
        this.validateDateField(record.id_issue_date, 'id_issue_date');



        if (record.id_number && typeof record.id_number !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường id_number phải là kiểu string.`);
        }


        if (record.ethnicity && typeof record.ethnicity !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường ethnicity phải là kiểu string.`);
        }

        if (record.id_issue_place && typeof record.id_issue_place !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường id_issue_place phải là kiểu string.`);
        }

        if (record.insurance_number && typeof record.insurance_number !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường insurance_number phải là kiểu string.`);
        }

        if (record.tax_number && typeof record.tax_number !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường tax_number phải là kiểu string.`);
        }

        if (record.phone_number && typeof record.phone_number !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường phone_number phải chỉ chứa các chữ số.`);
        }


        if (record.email && !/\S+@\S+\.\S+/.test(record.email)) {
            throw new Error(`Bản ghi không hợp lệ: trường email phải có định dạng hợp lệ.`);
        }

        if (record.alternate_phone_number && !/^\d{10}$/.test(record.alternate_phone_number)) {
            throw new Error(`Bản ghi không hợp lệ: trường alternate_phone_number phải là số điện thoại hợp lệ.`);
        }

        if (record.alternate_name && typeof record.alternate_name !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường alternate_name phải là kiểu string.`);
        }

        if (record.alternate_relationship && typeof record.alternate_relationship !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường alternate_relationship phải là kiểu string.`);
        }

        if (record.birth_address && typeof record.birth_address !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường birth_address phải là kiểu string.`);
        }

        if (record.birth_province && typeof record.birth_province !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường birth_province phải là kiểu string.`);
        }

        if (record.birth_district && typeof record.birth_district !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường birth_district phải là kiểu string.`);
        }

        if (record.birth_ward && typeof record.birth_ward !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường birth_ward phải là kiểu string.`);
        }

        if (record.current_address && typeof record.current_address !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường current_address phải là kiểu string.`);
        }

        if (record.current_province && typeof record.current_province !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường current_province phải là kiểu string.`);
        }

        if (record.current_district && typeof record.current_district !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường current_district phải là kiểu string.`);
        }

        if (record.current_ward && typeof record.current_ward !== 'string') {
            throw new Error(`Bản ghi không hợp lệ: trường current_ward phải là kiểu string.`);
        }



        return true;
    }
    private validateDateField(dateField: any, fieldName: string): void {
        if (dateField) {
            const date = new Date(dateField);
            if (isNaN(date.getTime())) { // Kiểm tra xem ngày có hợp lệ hay không
                throw new Error(`Bản ghi không hợp lệ: trường ${fieldName} phải là kiểu Date hợp lệ.`);
            }
        }
    }








    private async processHRPersonnelDatas(importData: any[], tableNames: string): Promise<void> {
        const batchSize = 1000;
        const totalBatches = Math.ceil(importData.length / batchSize);
        const tables = tableNames.split(',');
        console.log("tables", tables)
        for (let i = 0; i < totalBatches; i++) {
            const batch = importData.slice(i * batchSize, (i + 1) * batchSize);

            const dataToSave: { [key: string]: any[] } = {};

            batch.forEach(record => {
                tables.forEach(table => {
                    if (!dataToSave[table]) {
                        dataToSave[table] = [];
                    }

                    /*    switch (table) {
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
                                       type_personnel: record.type_personnel || true,
                                   } as CreatePersonnelDto);
                               }
                               break;
                           case 'hr_language':
                               break;
                           case 'hr_family':
                               break;
                           case 'hr_experience':
                               break;
                           case 'hr_education':
                               break;
                       } */
                });
            });

        }
    }
}
