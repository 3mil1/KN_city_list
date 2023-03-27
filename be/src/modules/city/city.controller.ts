import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Options } from 'csv-parse';
import { CsvParserService } from '@app/modules/csv-parser/csv-parser.service';
import { CityService } from '@app/modules/city/city.service';
import { CityEntity } from '@app/modules/city/city.entity';
import { CsvColumnsValidator } from '@app/modules/city/pipes/CsvColumsValidator.pipe';
import { JwtAuthGuard } from '@app/modules/auth/guards/jwt.guard';
import { HasRoles } from '@app/modules/role/decorators/roles.decorator';
import { RoleGuard } from '@app/modules/role/guards/roles.guard';

@Controller('cities')
export class CityController {
  constructor(private readonly csvParserService: CsvParserService, private readonly cityService: CityService) {}

  @Get()
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') searchTerm?: string,
  ): Promise<Pagination<CityEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.cityService.get(
      {
        page,
        limit,
        route: '/cities',
      },
      searchTerm,
    );
  }

  @Put()
  @HasRoles('ROLE_ALLOW_EDIT')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateCity(@Body() cityData: Partial<CityEntity>): Promise<Partial<CityEntity>> {
    try {
      return await this.cityService.update(cityData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCities(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .addValidator(new CsvColumnsValidator({ columns: ['id', 'name', 'photo'] }))
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<{ message: string }> {
    const fileData = file.buffer.toString('utf-8');
    const options: Options = {
      delimiter: ',',
      cast: (value, context) => {
        if (context.column === 'id') {
          return parseInt(value, 10);
        }
        return value;
      },
      columns: ['id', 'name', 'photo'],
      fromLine: 2,
    };

    const cities = await this.csvParserService.parseCsv(fileData, options);
    const insertedCount = await this.cityService.seed(cities);

    return {
      message: `Cities uploaded successfully. ${insertedCount} cities were inserted.`,
    };
  }
}
