import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CityEntity } from '@app/modules/city/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly logger: Logger,
  ) {}

  async get(options: IPaginationOptions, searchTerm?: string): Promise<Pagination<CityEntity>> {
    const queryBuilder = this.cityRepository.createQueryBuilder('cities').orderBy({ 'cities.name': 'ASC' });

    if (searchTerm) {
      queryBuilder.where('cities.name ILIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
    }

    const result = await paginate<CityEntity>(queryBuilder, options);
    this.logger.log(
      `Fetched cities (page: ${options.page}, limit: ${options.limit}, search: ${searchTerm || 'none'}) - total: ${
        result.meta.totalItems
      }`,
      CityService.name,
    );
    return result;
  }

  async update(cityData: Partial<CityEntity>): Promise<Partial<CityEntity>> {
    const { id } = cityData;
    const city = await this.cityRepository.findOne({
      where: { id: id },
    });

    if (!city) {
      this.logger.log(`City with ID ${id} not found`, CityService.name);
      throw new NotFoundException(`City with ID ${id} not found`);
    }

    try {
      await this.cityRepository.upsert(cityData, ['id']);
      this.logger.log(`City with ID ${id} updated`, CityService.name);
      return cityData;
    } catch (error) {
      const typedError = error as QueryFailedError;

      this.logger.error(`Error updating city: ${typedError.message}`, typedError.stack, CityService.name);
    }
  }

  async seed(cities: CityEntity[]): Promise<number> {
    const chunkSize = 200;
    let insertedCount = 0;

    for (let i = 0; i < cities.length; i += chunkSize) {
      const chunk = cities.slice(i, i + chunkSize);
      const targetEntity = this.cityRepository.target;

      const result = await this.cityRepository
        .createQueryBuilder()
        .insert()
        .into(targetEntity)
        .returning('*')
        .values(chunk)
        .orIgnore()
        .execute();

      insertedCount += result.generatedMaps.filter((obj) => Object.keys(obj).length > 0).length;
    }

    this.logger.log(`Total cities inserted: ${insertedCount}`, CityService.name);
    return insertedCount;
  }
}
