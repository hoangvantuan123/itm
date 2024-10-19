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
                empid: cid,
                wk_date: MoreThanOrEqual(`${year}${String(month).padStart(2, '0')}01`),
            },
        });

        const filteredRecords = records.filter(record =>
            record.wk_date < `${year}${String(month + 1).padStart(2, '0')}01`
        );

        if (filteredRecords.length === 0) {
            return {
                status: false,
                message: 'No records found for the provided CID and month/year',
                data: [],
            };
        }

        const groupedByDate = filteredRecords.reduce((acc, record) => {
            const date = record.wk_date.toString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(record);
            return acc;
        }, {});

        // Chuyển đổi dữ liệu và định dạng lại
        const result = Object.keys(groupedByDate).map(date => {
            const year = date.substring(0, 4);
            const month = date.substring(4, 6);
            const day = date.substring(6, 8);

            return {
                date: `${year}-${month}-${day}`,
                records: groupedByDate[date].map((record: any) => {
                    const timeString = String(record.d_time).padStart(4, '0');
                    const hours = timeString.slice(0, -2);
                    const minutes = timeString.slice(-2);
                    const formattedTime = `${hours}:${minutes}`;

                    return {
                        empid: record.empid,
                        empname: record.empname,
                        department_name: record.department_name,
                        wk_item_seq: record.wk_item_seq,
                        wk_item_name: record.wk_item_name,
                        company_seq: record.company_seq,
                        wk_date: moment.tz(`${record.wk_date}`, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
                        emp_seq: record.emp_seq,
                        dt_cnt: record.dt_cnt,
                        d_time: formattedTime,
                        min_cnt: record.min_cnt,
                        umgrp_seq: record.umgrp_seq,
                        umwkgrp_seq: record.umwkgrp_seq,
                        last_user_seq: record.last_user_seq,
                        last_date_time: record.last_date_time,
                        is_ot: record.is_ot,
                    };
                }),
            };
        });

        return {
            status: true,
            message: 'Records found successfully',
            data: result,
        };
    }



    async getAllHrSalarysPageLimit(
        filter: Record<string, any> = {},
        page: number = 1,
        limit: number = 50 // Default limit is 50
    ): Promise<{ data: any[]; total: number; totalPages: number; message: string }> {
        page = Math.max(1, page);
        limit = Math.max(1, limit);
    
        const query = this.timekeepingRepository.createQueryBuilder('hr_timekeeping');
    
        // Validate month_year filter and derive dates
        if (filter.month_year) {
            const [month, year] = filter.month_year.split('-').map(Number);
            
            if (isNaN(month) || isNaN(year)) {
                return {
                    data: [],
                    total: 0,
                    totalPages: 0,
                    message: 'Invalid month or year format. Use MM-YYYY.',
                };
            }
    
            const startDate = `${year}${String(month).padStart(2, '0')}01`;
            const nextMonth = month === 12 ? 1 : month + 1;
            const nextYear = month === 12 ? year + 1 : year;
            const endDate = `${nextYear}${String(nextMonth).padStart(2, '0')}01`;
    
            query.andWhere('hr_timekeeping.wk_date >= :startDate AND hr_timekeeping.wk_date < :endDate', { startDate, endDate });
        }
    
        const [data, total] = await query
            .select([
                'hr_timekeeping.empid',
                'hr_timekeeping.empname',
                'hr_timekeeping.department_name',
                'hr_timekeeping.wk_date',
            ])
            .orderBy('hr_timekeeping.id', 'DESC')
            .getManyAndCount();
    
        // Use a Map to group data efficiently
        const groupedData = new Map<string, any>();
    
        data.forEach(record => {
            const formattedDate = moment.tz(record.wk_date, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').format('MM-YYYY');
            const key = `${formattedDate}-${record.empid}`;
    
            if (!groupedData.has(key)) {
                groupedData.set(key, {
                    date: formattedDate,
                    empid: record.empid,
                    empname: record.empname,
                    department_name: record.department_name,
                    dates: new Set(),
                });
            }
    
            groupedData.get(key)?.dates.add(formattedDate);
        });
    
        const result = Array.from(groupedData.values()).map(item => ({
            ...item,
            dates: Array.from(item.dates),
        }));
    
        const paginatedResult = result.slice((page - 1) * limit, page * limit);
        const uniqueTotal = result.length;
    
        return {
            data: paginatedResult,
            total: uniqueTotal,
            totalPages: Math.ceil(uniqueTotal / limit), // Total pages based on unique count
            message: 'Success',
        };
    }
    



    async getAllHrSalarysPageLimitFilter(
        filter: Record<string, any> = {},
        page: number = 1,
        limit: number = 10000,
        date?: string
    ): Promise<{ data: any[]; total: number; totalPages: number; message: string }> {
        page = Math.max(1, page);
        limit = Math.max(1, limit);
    
        const query = this.timekeepingRepository.createQueryBuilder('hr_timekeeping');
    
        // Utility function to add filter conditions
        const addFilterCondition = (filterKey: string, dbField: string) => {
            if (filter[filterKey]?.length) {
                const conditions = filter[filterKey].map((value: any, index: number) => `${dbField} ILIKE :${filterKey}${index}`);
                filter[filterKey].forEach((value: any, index: number) => {
                    query.setParameter(`${filterKey}${index}`, `%${value}%`);
                });
                query.andWhere(`(${conditions.join(' OR ')})`);
            }
        };
    
        addFilterCondition('nameTags', 'hr_timekeeping.empname');
        addFilterCondition('cid', 'hr_timekeeping.empid');
        addFilterCondition('department', 'hr_timekeeping.department_name');
    
        // Utility function to set date filters
        const setDateFilters = (dateString: string) => {
            const [month, year] = dateString.split('-').map(Number);
            if (isNaN(month) || isNaN(year)) {
                return false; // Indicate invalid date format
            }
    
            const startDate = `${year}${String(month).padStart(2, '0')}01`;
            const nextMonth = month === 12 ? 1 : month + 1;
            const nextYear = month === 12 ? year + 1 : year;
            const endDate = `${nextYear}${String(nextMonth).padStart(2, '0')}01`;
    
            query.andWhere('hr_timekeeping.wk_date >= :startDate AND hr_timekeeping.wk_date < :endDate', { startDate, endDate });
            return true; // Indicate valid date format
        };
    
        // Set date filters for both the `date` parameter and `filter.month_year`
        if (date && !setDateFilters(date)) {
            return {
                data: [],
                total: 0,
                totalPages: 0,
                message: 'Invalid month or year format. Use MM-YYYY.',
            };
        }
    
        if (filter.month_year && !setDateFilters(filter.month_year)) {
            return {
                data: [],
                total: 0,
                totalPages: 0,
                message: 'Invalid month or year format. Use MM-YYYY.',
            };
        }
    
        // Prepare query to select relevant fields
        query
            .select([
                'hr_timekeeping.id',
                'hr_timekeeping.empid',
                'hr_timekeeping.empname',
                'hr_timekeeping.department_name',
                'hr_timekeeping.wk_item_seq',
                'hr_timekeeping.wk_item_name',
                'hr_timekeeping.company_seq',
                'hr_timekeeping.wk_date',
            ])
            .orderBy('hr_timekeeping.id', 'DESC');
    
        // Execute the query
        const [data, total] = await query.getManyAndCount();
    
        // Use a Map to group records by employee and date
        const groupedByEmployeeAndDate = new Map<string, any>();
    
        data.forEach(record => {
            const formattedDate = moment.tz(record.wk_date, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').format('MM-YYYY');
            const key = `${formattedDate}-${record.empid}`;
    
            if (!groupedByEmployeeAndDate.has(key)) {
                groupedByEmployeeAndDate.set(key, {
                    date: formattedDate,
                    empid: record.empid,
                    empname: record.empname,
                    department_name: record.department_name,
                    records: [],
                });
            }
    
            groupedByEmployeeAndDate.get(key)?.records.push({
                wk_item_seq: record.wk_item_seq,
                wk_item_name: record.wk_item_name,
                company_seq: record.company_seq,
                wk_date: moment.tz(record.wk_date, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD'),
            });
        });
    
        const result = Array.from(groupedByEmployeeAndDate.values());
    
        return {
            data: result,
            total,
            totalPages: Math.ceil(total / limit),
            message: 'Success',
        };
    }
    

    async getHrSalaryById(cid: string, month_year: string): Promise<any> {
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
                empid: cid,
                wk_date: MoreThanOrEqual(`${year}${String(month).padStart(2, '0')}01`),
            },
        });

        const filteredRecords = records.filter(record =>
            record.wk_date < `${year}${String(month + 1).padStart(2, '0')}01`
        );

        if (filteredRecords.length === 0) {
            return {
                status: false,
                message: 'No records found for the provided CID and month/year',
                data: [],
            };
        }

        const groupedByDate = filteredRecords.reduce((acc, record) => {
            const date = record.wk_date.toString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(record);
            return acc;
        }, {});

        // Initialize the default data structure with empty values
        const defaultData = {
            date: "",  // This field will hold a formatted date if needed
            empid: "",  // Employee ID
            empname: "",  // Employee name
            department_name: "",  // Employee department name
            start: {},  // Ensure these are initialized as objects
            stop: {},
            day_off: {},
            overtime_normal_150: {},
            overtime_normal_200: {},
            overtime_normal_210: {},
            at_night_30: {},
            overtime_sunday_200: {},
            overtime_sunday_270: {},
            overtime_holiday_300: {},
            overtime_holiday_390: {},
            working_day: {},
            late_in: {},
            early_out: {},
        };

        // Populate the defaultData with actual records
        for (let day = 1; day <= 31; day++) {
            const dayKey = String(day).padStart(2, '0'); // Use padStart to ensure two digits

            // Ensure all categories are initialized as empty objects
            for (const key in defaultData) {
                if (typeof defaultData[key] === 'object') {
                    defaultData[key][dayKey] = ""; // Set initial value to empty string
                }
            }

            // Check if there are records for that day
            const recordForDay = groupedByDate[`${year}${String(month).padStart(2, '0')}${dayKey}`];
            let haswk_item_seq29 = false;
            let haswk_item_seq43 = false;
            if (recordForDay) {
                recordForDay.forEach((record: any, index: any) => {
                    const dateParts = record.wk_date.toString();
                    const currentDay = dateParts.substring(6, 8);
                    const timeString = record.d_time.toString().padStart(4, '0');
                    const hours = timeString.slice(0, -2);
                    const minutes = timeString.slice(-2);
                    if (record.wk_item_seq === 29) haswk_item_seq29 = true;
                    if (record.wk_item_seq === 43) haswk_item_seq43 = true;
                    if (index === 0) {
                        defaultData.date = moment.tz(`${record.wk_date}`, 'YYYYMMDD', 'Asia/Ho_Chi_Minh').format('YYYY-MM'); // Format date
                        defaultData.empid = record.empid;
                        defaultData.empname = record.empname;
                        defaultData.department_name = record.department_name;
                    }
                    if (record.wk_item_seq === 29) {
                        defaultData.start[currentDay] = `${hours}:${minutes}`;
                    }
                    if (record.wk_item_seq === 43) {
                        defaultData.stop[currentDay] = `${hours}:${minutes}`;
                    }
                    defaultData.day_off[currentDay] = (!haswk_item_seq29 && !haswk_item_seq43) ? "1" : "";
                    if (record.wk_item_seq === 42) {
                        defaultData.overtime_normal_150[currentDay] = `${hours}:${minutes}`;
                    }
                    if (record.wk_item_seq === 41) {
                        defaultData.overtime_normal_200[currentDay] = `${hours}:${minutes}`;
                    }
                    if (record.wk_item_seq === 74) {
                        defaultData.overtime_normal_210[currentDay] = `${hours}:${minutes}`;
                    }
                    if (record.wk_item_seq === 40) {
                        defaultData.at_night_30[currentDay] = `${hours}:${minutes}`;
                    }

                    if (record.wk_item_seq === 31) {
                        defaultData.overtime_sunday_200[currentDay] = `${hours}:${minutes}`;
                    }


                    if (record.wk_item_seq === 39) {
                        defaultData.overtime_sunday_270[currentDay] = `${hours}:${minutes}`;
                    }

                    if (record.wk_item_seq === 38) {
                        defaultData.overtime_holiday_300[currentDay] = `${hours}:${minutes}`;
                    }
                    if (record.wk_item_seq === 35) {
                        defaultData.overtime_holiday_390[currentDay] = `${hours}:${minutes}`;
                    }
                    if (record.wk_item_seq === 11) {
                        defaultData.working_day[currentDay] = record.dt_cnt;
                    }
                    if (record.wk_item_seq === 34) {
                        defaultData.late_in[currentDay] = `${hours}:${minutes}`;
                    }
                    if (record.wk_item_seq === 33) {
                        defaultData.early_out[currentDay] = `${hours}:${minutes}`;
                    }

                });
            }

        }


        return {
            status: true,
            message: 'Records found successfully',
            data: defaultData,
        };
    }


}
