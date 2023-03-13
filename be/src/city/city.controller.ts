import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { CityService } from '@app/city/city.service';
import { CityEntity } from '@app/city/city.entity';
import { parse } from 'csv-parse';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<CityEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.cityService.getAll({
      page,
      limit,
      route: '/cities',
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const cities = await this.parseCitiesFile(file.buffer.toString('utf-8'));
    await this.cityService.seed(cities);
    return { message: 'File uploaded successfully' };
  }

  private parseCitiesFile(fileData: string): Promise<CityEntity[]> {
    return new Promise((resolve, reject) => {
      const parser = parse({
        delimiter: ',',
      });

      const cities: CityEntity[] = [];

      parser.on('readable', function () {
        let record;
        while ((record = parser.read()) !== null) {
          const [id, name, photo] = record;
          if (/^\d+$/.test(id)) {
            const city = new CityEntity();
            city.id = parseInt(id, 10);
            city.name = name;
            city.photo = photo;
            cities.push(city);
          } else {
            console.error(`Invalid id value "${id}" in CSV record: ${record}`);
          }
        }
      });

      parser.on('error', function (err) {
        reject(err);
      });

      parser.on('end', function () {
        resolve(cities);
      });

      parser.write(fileData);
      parser.end();
    });
  }
}
