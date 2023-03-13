import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '@app/city/city.entity';
import { InsertResult, Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async getAll(options: IPaginationOptions): Promise<Pagination<CityEntity>> {
    const queryBuilder = this.cityRepository.createQueryBuilder('cities');

    return paginate<CityEntity>(queryBuilder, options);
  }

  async seed(cities: CityEntity[]): Promise<InsertResult> {
    return await this.cityRepository.insert(cities);
  }
}
