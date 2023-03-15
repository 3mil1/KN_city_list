import { Logger, Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from '@app/modules/city/city.entity';
import { CsvParserModule } from '@app/modules/csv-parser/csv-parser.module';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), CsvParserModule],
  controllers: [CityController],
  providers: [CityService, CityEntity, Logger],
})
export class CityModule {}
