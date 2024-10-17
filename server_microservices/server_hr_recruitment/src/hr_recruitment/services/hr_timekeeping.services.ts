// src/hr-interview-candidates/hr-interview-candidates.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import { HrTimekeeping } from '../entity/hr_timekeeping.entity';
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


    async findByCidAndMonthYear(cid: string, month_year: string): Promise<HrTimekeeping[]> {
        if (!cid) {
            throw new BadRequestException('CID is required');
        }
        
        if (!month_year) {
            throw new BadRequestException('Month and year are required');
        }
    
        const [month, year] = month_year.split('-').map(Number);
    
        if (isNaN(month) || isNaN(year)) {
            throw new BadRequestException('Invalid month or year format. Use MM-YYYY.');
        }
    
        const startOfMonth = new Date(year, month - 1, 1); 
        const endOfMonth = new Date(year, month, 1); 
    
        const records = await this.timekeepingRepository.find({
            where: {
                cid: cid,
                checkin: MoreThanOrEqual(startOfMonth),
            },
        });
    
        const filteredRecords = records.filter(record => 
            record.checkin < endOfMonth
        );
    
        if (filteredRecords.length === 0) {
            throw new NotFoundException('No records found for the provided CID and month/year');
        }
    
        return filteredRecords;
    }
    

}
