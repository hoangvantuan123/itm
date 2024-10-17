// src/hr-interview-candidates/hr-interview-candidates.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import { HrTimekeeping } from '../../hr_salary/entity/hr_timekeeping.entity';
@Injectable()
export class HrTimeKeepingServices {
    constructor(
        @InjectRepository(HrTimekeeping)
        private readonly timekeepingRepository: Repository<HrTimekeeping>,

    ) { }

    async create(
        create: Partial<HrTimekeeping>,
    ): Promise<{ success: boolean; message: string; data?: HrTimekeeping }> {

        const data = this.timekeepingRepository.create(create);
        await this.timekeepingRepository.save(data);
        return {
            success: true,
            message: 'Nhóm đã được tạo thành công',
            data: data,
        };
    }


    async findByCidAndMonthYear(cid: string, month_year: string): Promise<any> {
        if (!cid) {
            return {
                status: false,
                message: 'CID is required',
                data: [],
            };
        }

        if (!month_year) {
            return {
                status: false,
                message: 'Month and year are required',
                data: [],
            };
        }

        const [month, year] = month_year.split('-').map(Number);

        if (isNaN(month) || isNaN(year)) {
            return {
                status: false,
                message: 'Invalid month or year format. Use MM-YYYY.',
                data: [],
            };
        }

        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 1);

        const records = await this.timekeepingRepository.find({
            where: {
                cid: cid,
                check_in: MoreThanOrEqual(startOfMonth),
            },
        });

        const filteredRecords = records.filter(record =>
            record.check_in < endOfMonth
        );

        if (filteredRecords.length === 0) {
            return {
                status: false,
                message: 'No records found for the provided CID and month/year',
                data: [],
            };
        }

        const groupedByDate = filteredRecords.reduce((acc, record) => {
            const date = record.check_in.toISOString().split('T')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(record);
            return acc;
        }, {});

        return {
            status: true,
            message: 'Records found successfully',
            data: Object.keys(groupedByDate).map(date => ({
                date,
                records: groupedByDate[date],
            })),
        };
    }

}
