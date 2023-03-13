import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity } from '@app/city/city.entity';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}

  async getAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find();
  }

  async seed(cities: CityEntity[]): Promise<InsertResult> {
    return await this.cityRepository.insert(cities);
  }
}
