import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DefaultMapping } from '../entity/default_mappings.entity';

@Injectable()
export class DefaultMappingServices {
  private readonly logger = new Logger(DefaultMappingServices.name);

  constructor(
    @InjectRepository(DefaultMapping)
    private readonly defaultMappingRepository: Repository<DefaultMapping>,
  ) { }



  async getAllMappings(): Promise<Record<string, string>> {
    this.logger.log('Fetching all mappings');

    try {
      const mappings = await this.defaultMappingRepository.find();

      const result: Record<string, string> = {};

      mappings.forEach(mapping => {
        result[mapping.original_name] = mapping.mapped_name;
      });

      return result;

    } catch (error) {
      this.logger.error('Error fetching mappings:', error);
      return {};
    }
  }
  async create(
    createDto: Partial<DefaultMapping>,
  ): Promise<{ success: boolean; message: string; data?: DefaultMapping }> {


    const data = this.defaultMappingRepository.create(createDto);
    await this.defaultMappingRepository.save(data);
    return {
      success: true,
      message: 'Success',
      data: data,
    };
  }
  async createMapping(
    original_name: string,
    mapped_name: string,
  ): Promise<DefaultMapping> {
    this.logger.log(`Creating new mapping: ${original_name} -> ${mapped_name}`);
    const newMapping = this.defaultMappingRepository.create({
      original_name,
      mapped_name,
    });
    return this.defaultMappingRepository.save(newMapping);
  }

  async updateMapping(
    id: number,
    updatedData: { original_name?: string; mapped_name?: string },
  ): Promise<DefaultMapping> {
    const mapping = await this.defaultMappingRepository.findOne({ where: { id } });

    if (!mapping) {
      this.logger.error(`Mapping with ID ${id} not found`);
      throw new NotFoundException(`Mapping with ID ${id} not found`);
    }

    Object.assign(mapping, updatedData);
    this.logger.log(`Updating mapping with ID ${id}`);
    return this.defaultMappingRepository.save(mapping);
  }

  async deleteMapping(id: number): Promise<void> {
    const result = await this.defaultMappingRepository.delete(id);

    if (result.affected === 0) {
      this.logger.error(`Mapping with ID ${id} not found`);
      throw new NotFoundException(`Mapping with ID ${id} not found`);
    }

    this.logger.log(`Deleted mapping with ID ${id}`);
  }

  async findAllPageLimitFilter(
    filter: Record<string, any> = {},
    page: number = 1,
    limit: number = 1000
  ): Promise<{ data: DefaultMapping[]; total: number; totalPages: number }> {
    const query = this.defaultMappingRepository.createQueryBuilder('default_mappings');

    const addFilterCondition = (filterKey: string, dbField: string) => {
      if (filter[filterKey] && filter[filterKey].length > 0) {
        const conditions = filter[filterKey].map((value: any, index: any) => `${dbField} ILIKE :${filterKey}${index}`);
        filter[filterKey].forEach((value: any, index: any) => {
          query.setParameter(`${filterKey}${index}`, `%${value}%`);
        });
        query.andWhere(`(${conditions.join(' OR ')})`);
      }
    };

    addFilterCondition('nameTags', 'default_mappings.original_name');



    query
      .select([
        'default_mappings.id',
        'default_mappings.original_name',
        'default_mappings.mapped_name',

      ])
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('default_mappings.id', 'DESC');

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

    await this.defaultMappingRepository.manager.transaction(async (transactionalEntityManager) => {
      for (const batch of idBatches) {
        await transactionalEntityManager.delete(this.defaultMappingRepository.target, { id: In(batch) });
      }
    });
  }

}
