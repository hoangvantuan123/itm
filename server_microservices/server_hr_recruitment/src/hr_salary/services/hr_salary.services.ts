import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In } from 'typeorm';
import { HrSalary } from '../entity/hr_salary.entity';

@Injectable()
export class HrSalaryService {
    constructor(
        @InjectRepository(HrSalary)
        private readonly hrSalaryRepository: Repository<HrSalary>,
    ) { }

    async createHrSalary(data: Partial<HrSalary>): Promise<HrSalary> {
        try {
            const newHrSalary = this.hrSalaryRepository.create(data);
            return await this.hrSalaryRepository.save(newHrSalary);
        } catch (error) {
            throw new InternalServerErrorException('Error saving the salary record');
        }
    }


    
    async getHrSalaryByCid(
        page: number = 1,
        limit: number = 10000,
        cid: string,
        monthYear?: string
    ): Promise<{ data: HrSalary[]; total: number; totalPages: number }> {
        page = Math.max(1, page);
        limit = Math.max(1, limit);

        const query = this.hrSalaryRepository.createQueryBuilder('hr_salary')
            .where('hr_salary.cid = :cid', { cid });

        if (monthYear) {
            const [month, year] = monthYear.split('/');
            query.andWhere('hr_salary.monthly_salary = :monthly_salary', {
                monthly_salary: `${month}/${year}`,
            });
        }

        query
            .select([
                'hr_salary.id',
                'hr_salary.no',
                'hr_salary.name',
                'hr_salary.monthly_salary',
                'hr_salary.date_in',
                'hr_salary.cid',
                'hr_salary.department',
                'hr_salary.total',
                'hr_salary.normal_150',
                'hr_salary.normal_200',
                'hr_salary.normal_210',
                'hr_salary.night_30',
                'hr_salary.sunday_200',
                'hr_salary.sunday_270',
                'hr_salary.holiday_300',
                'hr_salary.holiday_390',
                'hr_salary.total_late_in',
                'hr_salary.total_early_out',
                'hr_salary.total_late_in_early_out',
                'hr_salary.tong_ngay_nghi',
                'hr_salary.paid_leave',
                'hr_salary.nghi_co_phep_khong_luong',
                'hr_salary.phep_thang_nay',
                'hr_salary.ton_phep_thang_nay',
                'hr_salary.so_ngay_di_lam_trong_thang',
                'hr_salary.so_ngay_di_lam_thuc_te',
                'hr_salary.ky_nhan',
                'hr_salary.muon_phep',
                'hr_salary.start',
                'hr_salary.stop',
                'hr_salary.day_off',
                'hr_salary.overtime_normal_150',
                'hr_salary.overtime_normal_200',
                'hr_salary.overtime_normal_210',
                'hr_salary.at_night_30',
                'hr_salary.overtime_sunday_200',
                'hr_salary.overtime_sunday_270',
                'hr_salary.overtime_holiday_300',
                'hr_salary.overtime_holiday_390',
                'hr_salary.working_day',
                'hr_salary.late_in',
                'hr_salary.early_out',
                'hr_salary.synchronize',
                'hr_salary.synchronize_erp',
            ])
            .skip((page - 1) * limit) 
            .take(limit)  
            .orderBy('hr_salary.id', 'DESC');  

        const [data, total] = await query.getManyAndCount();

        return {
            data,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }




    async getAllHrSalariesPageLimit(
        filter: Record<string, any> = {},
        page: number = 1,
        limit: number = 10000,
        date?: string,
    ): Promise<{ data: HrSalary[]; total: number; totalPages: number }> {
        page = Math.max(1, page);
        limit = Math.max(1, limit);

        const query = this.hrSalaryRepository.createQueryBuilder('hr_salary');

        Object.entries(filter).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query.andWhere(`hr_salary.${key} = :${key}`, { [key]: value });
            }
        });

        if (date) {
            const [month, year] = date.split('/');
            query.andWhere('hr_salary.monthly_salary = :monthly_salary', {
                monthly_salary: `${month}/${year}`,
            });
        }

        query
            .select([
                'hr_salary.id',
                'hr_salary.no',
                'hr_salary.name',
                'hr_salary.monthly_salary',
                'hr_salary.date_in',
                'hr_salary.cid',
                'hr_salary.department',
                'hr_salary.total',
                'hr_salary.normal_150',
                'hr_salary.normal_200',
                'hr_salary.normal_210',
                'hr_salary.night_30',
                'hr_salary.sunday_200',
                'hr_salary.sunday_270',
                'hr_salary.holiday_300',
                'hr_salary.holiday_390',
                'hr_salary.total_late_in',
                'hr_salary.total_early_out',
                'hr_salary.total_late_in_early_out',
                'hr_salary.tong_ngay_nghi',
                'hr_salary.paid_leave',
                'hr_salary.nghi_co_phep_khong_luong',
                'hr_salary.phep_thang_nay',
                'hr_salary.ton_phep_thang_nay',
                'hr_salary.so_ngay_di_lam_trong_thang',
                'hr_salary.so_ngay_di_lam_thuc_te',
                'hr_salary.ky_nhan',
                'hr_salary.muon_phep',
                'hr_salary.start',
                'hr_salary.stop',
                'hr_salary.day_off',
                'hr_salary.overtime_normal_150',
                'hr_salary.overtime_normal_200',
                'hr_salary.overtime_normal_210',
                'hr_salary.at_night_30',
                'hr_salary.overtime_sunday_200',
                'hr_salary.overtime_sunday_270',
                'hr_salary.overtime_holiday_300',
                'hr_salary.overtime_holiday_390',
                'hr_salary.working_day',
                'hr_salary.late_in',
                'hr_salary.early_out',
                'hr_salary.synchronize',
                'hr_salary.synchronize_erp',

            ])
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('hr_salary.id', 'DESC');

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
        date?: string
    ): Promise<{ data: HrSalary[]; total: number; totalPages: number }> {
        const query = this.hrSalaryRepository.createQueryBuilder('hr_salary');

        const addFilterCondition = (filterKey: string, dbField: string) => {
            if (filter[filterKey] && filter[filterKey].length > 0) {
                const conditions = filter[filterKey].map((value: any, index: any) => `${dbField} ILIKE :${filterKey}${index}`);
                filter[filterKey].forEach((value: any, index: any) => {
                    query.setParameter(`${filterKey}${index}`, `%${value}%`);
                });
                query.andWhere(`(${conditions.join(' OR ')})`);
            }
        };

        addFilterCondition('nameTags', 'hr_salary.name');
        addFilterCondition('cid', 'hr_salary.cid');
        addFilterCondition('department', 'hr_salary.department');


        if (date) {
            const [month, year] = date.split('/');
            query.andWhere('hr_salary.monthly_salary = :monthly_salary', {
                monthly_salary: `${month}/${year}`,
            });
        }

        if (filter.syn !== undefined) {
            query.andWhere('hr_salary.synchronize = :syn', { syn: filter.syn });
        }

        query
            .select([
                'hr_salary.id',
                'hr_salary.no',
                'hr_salary.name',
                'hr_salary.monthly_salary',
                'hr_salary.date_in',
                'hr_salary.cid',
                'hr_salary.department',
                'hr_salary.total',
                'hr_salary.normal_150',
                'hr_salary.normal_200',
                'hr_salary.normal_210',
                'hr_salary.night_30',
                'hr_salary.sunday_200',
                'hr_salary.sunday_270',
                'hr_salary.holiday_300',
                'hr_salary.holiday_390',
                'hr_salary.total_late_in',
                'hr_salary.total_early_out',
                'hr_salary.total_late_in_early_out',
                'hr_salary.tong_ngay_nghi',
                'hr_salary.paid_leave',
                'hr_salary.nghi_co_phep_khong_luong',
                'hr_salary.phep_thang_nay',
                'hr_salary.ton_phep_thang_nay',
                'hr_salary.so_ngay_di_lam_trong_thang',
                'hr_salary.so_ngay_di_lam_thuc_te',
                'hr_salary.ky_nhan',
                'hr_salary.muon_phep',
                'hr_salary.start',
                'hr_salary.stop',
                'hr_salary.day_off',
                'hr_salary.overtime_normal_150',
                'hr_salary.overtime_normal_200',
                'hr_salary.overtime_normal_210',
                'hr_salary.at_night_30',
                'hr_salary.overtime_sunday_200',
                'hr_salary.overtime_sunday_270',
                'hr_salary.overtime_holiday_300',
                'hr_salary.overtime_holiday_390',
                'hr_salary.working_day',
                'hr_salary.late_in',
                'hr_salary.early_out',
                'hr_salary.synchronize',
                'hr_salary.synchronize_erp'
            ])
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('hr_salary.id', 'DESC');

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

        await this.hrSalaryRepository.manager.transaction(async (transactionalEntityManager) => {
            for (const batch of idBatches) {
                await transactionalEntityManager.delete(this.hrSalaryRepository.target, { id: In(batch) });
            }
        });
    }


    async getHrSalaryById(id: number): Promise<any> {
        try {
            const inter = await this.hrSalaryRepository.findOne({
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
                data: inter
            };
        } catch (error) {
            console.error('Error fetching personnel:', error);
            return {
                status: false,
                data: [],
            };
        }
    }


}
