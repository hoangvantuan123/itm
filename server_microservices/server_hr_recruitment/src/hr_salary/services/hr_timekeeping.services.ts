// src/hr-interview-candidates/hr-interview-candidates.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import { HrTimekeeping } from '../../hr_salary/entity/hr_timekeeping.entity';
import * as moment from 'moment-timezone';
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

    const records = await this.timekeepingRepository.find({
        where: {
            EmpId: cid,
            WkDate: MoreThanOrEqual(`${year}${String(month).padStart(2, '0')}01`), // Lấy ngày đầu tháng
        },
    });

    const filteredRecords = records.filter(record =>
        record.WkDate < `${year}${String(month + 1).padStart(2, '0')}01` // Lấy ngày đầu tháng tiếp theo
    );

    if (filteredRecords.length === 0) {
        return {
            status: false,
            message: 'No records found for the provided CID and month/year',
            data: [],
        };
    }

    const groupedByDate = filteredRecords.reduce((acc, record) => {
        const date = record.WkDate.toString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(record);
        return acc;
    }, {});

    // Chuyển đổi dữ liệu và định dạng lại
    const result = Object.keys(groupedByDate).map(date => {
        const year = date.substring(0, 4);  // Lấy 4 số đầu là năm
        const month = date.substring(4, 6); // Lấy 2 số tiếp theo là tháng
        const day = date.substring(6, 8);   // Lấy 2 số cuối là ngày

        return {
            date: `${year}-${month}-${day}`, // Định dạng DD-MM-YYYY
            records: groupedByDate[date].map(record => ({
                EmpId: record.EmpId,
                EmpName: record.EmpName,
                DepartmentName: record.DepartmentName,
                WkItemSeq: record.WkItemSeq,
                WkItemName: record.WkItemName,
                CompanySeq: record.CompanySeq,
                WkDate: moment.tz(`${record.WkDate}`, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
                EmpSeq: record.EmpSeq,
                DTCnt: record.DTCnt,
                // Định dạng DTime thành giờ (24h)
                DTime: moment(`2021-01-01 ${String(record.DTime).padStart(4, '0').replace(/(\d{2})(\d{2})/, '$1:$2')}`, 'YYYY-MM-DD HH:mm').tz('Asia/Ho_Chi_Minh').format('HH:mm'),
                MinCnt: record.MinCnt,
                UMGrpSeq: record.UMGrpSeq,
                UMWkGrpSeq: record.UMWkGrpSeq,
                LastUserSeq: record.LastUserSeq,
                LastDateTime: record.LastDateTime,
                IsOT: record.IsOT,
            })),
        };
    });

    return {
        status: true,
        message: 'Records found successfully',
        data: result,
    };
}


}
