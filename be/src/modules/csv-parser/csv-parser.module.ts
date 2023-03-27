import { Module } from '@nestjs/common';
import { CsvParserService } from '@app/modules/csv-parser/csv-parser.service';

@Module({
  providers: [CsvParserService],
  exports: [CsvParserService],
})
export class CsvParserModule {}
