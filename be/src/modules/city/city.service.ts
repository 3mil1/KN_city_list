import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CityEntity } from '@app/modules/city/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
    private readonly logger: Logger,
  ) {}

  async getAll(options: IPaginationOptions): Promise<Pagination<CityEntity>> {
    const queryBuilder = this.cityRepository.createQueryBuilder('cities');

    return paginate<CityEntity>(queryBuilder, options);
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

      insertedCount += result.generatedMaps.filter(
        (obj) => Object.keys(obj).length > 0,
      ).length;
    }

    this.logger.log(
      `Total cities inserted: ${insertedCount}`,
      CityService.name,
    );
    return insertedCount;
  }
}
